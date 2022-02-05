using Cyber_Tool.Models;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Tool.Helper
{
    public class OpenSeaHelper
    {
        public static async Task<List<FeedsViewModel>> GetOpenSeaNFTs(string openSeaBaseUrl, string ethAddress)
        {
            // _configuration["OpenSeaUrl"]
            RestClient restClient = new RestClient(openSeaBaseUrl);
            //var client = new RestClient("order_direction=desc&offset=0&limit=20");
            var request = new RestRequest("assets")
                .AddParameter("owner", ethAddress)
                .AddParameter("order_direction", "desc")
                .AddParameter("offset", 0)
                .AddParameter("limit", 20)
                .AddParameter("format", "json");
            request.Method = Method.Get;
            request.AddHeader("Accept", "application/json");
            request.AddHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36 Edg/97.0.1072.69");
            var response = await restClient.ExecuteAsync<string>(request);
            return new List<FeedsViewModel>();
        }
    }
}
