// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

async function connectWallet() {
    if (typeof window.ethereum == 'undefined') {
        alert("Please install MetaMask.");
    }

    const accounts = await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{
            eth_accounts: {}
        }]
    }).then(() => ethereum.request({
        method: 'eth_requestAccounts'
    }))

    const account = accounts[0]

    $("#link_connect").hide();
    $("#link_Name").text(shortAddress(account));
    $("#link_Name").attr("title", account);

    var loginResponse = $.ajax({
        url: "/api/login/" + account,
        method: "get",
        async: false,
        success: function (response) {
            var ensStr = response.identity.domain;
            $("#link_Name").attr("title", ensStr);
            if (ensStr.length <= 0) {
                $("#link_Name").text(shortAddress(response.identity.address));
            } else {
                $("#link_Name").text(shortAddress(ensStr));
            }

            $("#link_Name").parent().show();
            setCookie("address", account);
            setCookie(account, JSON.stringify(response.identity));

            window.location.href = "/contacts/me/" + response.identity.address;
        }
    });
}

async function disconnect() {
    $("#link_connect").show();
    $("#link_Name").parent().hide();

    var cookie_address = getCookie("address");
    delCookie(cookie_address);
    delCookie("address");
}

function mainSearchFun(ethAddress) {
    window.location.href = "/contacts/me/" + ethAddress;
}

function openContacts() {
    var cookie_address = getCookie("address");
    if (cookie_address != null && cookie_address != undefined && cookie_address.length > 0) {
        window.location.href = "/contacts/me/" + cookie_address;
    } else {
        alert("Please contact your Metamask wallet.");
    }
}

function openSpace() {
    var cookie_address = getCookie("address");
    if (cookie_address != null && cookie_address != undefined && cookie_address.length > 0) {
        window.location.href = "/feeds/all/" + cookie_address;
    } else {
        alert("Please contact your Metamask wallet.");
    }
}

function shortAddress(address) {
    if (address.length > 15) {
        return address.substr(0, 11) + "...";
    } else {
        return address;
    }
}

// set cookies
function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
// read cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
// delete cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 24 * 60 * 60 * 1000);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}