using Cyber_Tool.Models;
using Microsoft.Extensions.Configuration;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Tool.Helper
{
    public class PoapHelper
    {
        private IConfiguration _configuration;

        private CacheHelpter _cacheHelpter;

        private string basePoapUrl;

        public PoapHelper(IConfiguration configuration,
            CacheHelpter cacheHelpter)
        {
            _configuration = configuration;
            _cacheHelpter = cacheHelpter;
            basePoapUrl = _configuration["PoapUrl"];
        }

        public async Task<List<FeedsViewModel>> GetPoapNFTs(string ethAddress)
        {
            RestClient restClient = new RestClient($"{basePoapUrl}actions");
            //var client = new RestClient("order_direction=desc&offset=0&limit=20");
            var request = new RestRequest($"scan/{ethAddress}")
                .AddParameter("order_direction", "desc");
            request.Method = Method.Get;
            var response = await restClient.ExecuteAsync<List<PoapModel>>(request);
            var responseData = response.Data;
            List<FeedsViewModel> feedsModel = new List<FeedsViewModel>();
            Cyber_Result cyber_Result = await _cacheHelpter.GetCyberReusltByAddress(ethAddress);
            responseData.OrderByDescending(r => r.Created_DT).ToList().ForEach(x =>
              {
                  feedsModel.Add(new FeedsViewModel()
                  {
                      Feed_CreateTime = x.FeedsCreateStr,
                      Feed_CreateTime_DT = x.Created_DT,
                      User_Name = string.IsNullOrEmpty(cyber_Result.Identity.Ens) ? ethAddress : cyber_Result.Identity.Ens,
                      User_ImgUrl = string.IsNullOrEmpty(cyber_Result.Identity.Avatar) ? _configuration["DefaultAvatar"] : cyber_Result.Identity.Avatar,
                      NFT_ImgUrl = x.Event.Image_url,
                      NFT_Message = x.Event.Description
                  });
              });
            return feedsModel;
        }
    }
}
