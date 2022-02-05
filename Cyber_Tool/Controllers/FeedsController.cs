using Cyber_Tool.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using RestSharp;
using System.Threading.Tasks;
using Cyber_Tool.Helper;
using Microsoft.Extensions.Caching.Memory;
using System.Linq;
using System;

namespace Cyber_Tool.Controllers
{
    public class FeedsController : Controller
    {
        private IConfiguration _configuration;

        private CyberConHelper _cyberConHelper;

        private CacheHelpter _cacheHelpter;

        private PoapHelper _poapHelper;

        public FeedsController(IConfiguration configuration,
            CacheHelpter cacheHelpter,
            PoapHelper poapHelper,
            CyberConHelper cyberConHelper)
        {
            _configuration = configuration;
            _cacheHelpter = cacheHelpter;
            _poapHelper = poapHelper;
            _cyberConHelper = cyberConHelper;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> All(string id)
        {
            List<FeedsViewModel> models = new List<FeedsViewModel>() { };

            try
            {
                // add openSea when get the opensea key
                //var models = await OpenSeaHelper.GetOpenSeaNFTs(_configuration["OpenSeaUrl"], id);
                var followingList = await _cyberConHelper.GetFollowList(id, false, "eth");
                List<Task<List<FeedsViewModel>>> taskList = new List<Task<List<FeedsViewModel>>>() { };
                followingList.ForEach(f =>
                {
                    taskList.Add(_poapHelper.GetPoapNFTs(f.Address));
                });

                foreach (var task in taskList)
                {
                    models.AddRange(task.Result);
                }
                models = models.OrderByDescending(m => m.Feed_CreateTime_DT).Take(200).ToList();
            }
            catch (Exception ex)
            {
                models = new List<FeedsViewModel>() { };
            }
            return View(models);
        }

        public async Task<IActionResult> Me(string id)
        {
            List<FeedsViewModel> models = new List<FeedsViewModel>() { };
            try
            {
                models = await _poapHelper.GetPoapNFTs(id);
                models = models.OrderByDescending(m => m.Feed_CreateTime_DT).Take(200).ToList();
            }
            catch(Exception ex)
            {
                models = new List<FeedsViewModel>() { };
            }

            return View(models);
        }
    }
}
