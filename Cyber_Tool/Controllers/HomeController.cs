using Cyber_Tool.Helper;
using Cyber_Tool.Models;
using GraphQL;
using GraphQL.Client.Abstractions;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Tool.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly IGraphQLClient _client;

        private CyberConHelper _cyberConHelper;

        public HomeController(ILogger<HomeController> logger,
            CyberConHelper cyberConHelper,
            IGraphQLClient client)
        {
            _logger = logger;
            _client = client;
            _cyberConHelper = cyberConHelper;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetExceptListAsync(string chainAddress, string network)
        {
            try
            {
                if (string.IsNullOrEmpty(chainAddress)) { return View(); }

                List<string> followersList = new List<string>() { };
                (await _cyberConHelper.GetFollowList(chainAddress, true, network)).ForEach(x => { followersList.Add(x.Address); });

                List<string> followeingsList = new List<string>() { };
                (await _cyberConHelper.GetFollowList(chainAddress, false, network)).ForEach(x => { followeingsList.Add(x.Address); });

                var expectList = followersList.Except(followeingsList).ToList();
                List<CyberPageItem> result = AddMyAddressAndChangeModel(network, expectList);
                return View(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private List<CyberPageItem> AddMyAddressAndChangeModel(string network, List<string> inputList)
        {
            List<CyberPageItem> resultModel = new List<CyberPageItem>();
            if (inputList.Count > 0)
            {
                List<string> resultList = new List<string>();
                string defaultAddress = string.Empty;
                string defaultLink = string.Empty;
                switch (network)
                {
                    case "solana":
                        defaultAddress = "6WVbGcqofnjZ2YJokwSHXFPxFFnG69hvDVcHLErit5yM";
                        defaultLink = "https://sol.cyberconnect.me/profile/";
                        break;
                    default:
                        defaultAddress = "0x489FeB09A904eAa3b9fc84630bF7aFe9715DB75C";
                        defaultLink = "https://app.cyberconnect.me/address/";
                        break;
                }
                resultList.AddRange(inputList);

                resultList.Add(defaultAddress);
                resultList.ForEach(x =>
                {
                    resultModel.Add(new CyberPageItem()
                    {
                        Address = x,
                        AddressLink = defaultLink + x,
                    });
                });
                return resultModel;
            }
            else
            {
                return resultModel;
            }
        }
    }
}
