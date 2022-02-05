using Cyber_Tool.Helper;
using Cyber_Tool.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cyber_Tool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private CyberConHelper _cyberConHelper;

        public LoginController(CyberConHelper cyberConHelper)
        {
            _cyberConHelper = cyberConHelper;
        }

        // GET api/<LoginController>/5
        [HttpGet("{id}")]
        public async Task<Cyber_Result> Get(string id)
        {
            var ethUserInfo = await _cyberConHelper.GetBaseInfoByAddress(id);
            return ethUserInfo;
        }
    }
}
