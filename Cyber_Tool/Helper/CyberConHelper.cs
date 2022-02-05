using Cyber_Tool.Models;
using GraphQL;
using GraphQL.Client.Abstractions;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Tool.Helper
{
    public class CyberConHelper
    {
        private readonly IGraphQLClient _client;

        private IConfiguration _configuration;

        public CyberConHelper(IGraphQLClient client,
             IConfiguration configuration)
        {
            _configuration = configuration;
            _client = client;
        }

        public async Task<Cyber_Result> GetBaseInfoByAddress(string chainAddress, string network = "eth")
        {
            GraphQLRequest request;
            request = new GraphQLRequest
            {
                Query = @"
                            query ownerQuery($addressId: String!) {
                              identity(address:$addressId) {
                                avatar
                                ens
                                followingCount
                                followerCount
                                address
                                domain
                              }
                            }",
                Variables = new
                {
                    addressId = chainAddress,
                    network = network
                }
            };

            var graphQLResponse = await _client.SendQueryAsync<Cyber_Result>(request);
            var result = graphQLResponse.Data;
            if (string.IsNullOrEmpty(result.Identity.Avatar)) { result.Identity.Avatar = _configuration["DefaultAvatar"]; }
            return graphQLResponse.Data;
        }

        public async Task<List<Cyber_Identity_Follow_List>> GetFollowList(string chainAddress, bool isFollower, string network = "eth")
        {
            List<Cyber_Identity_Follow_List> resultList = new List<Cyber_Identity_Follow_List>() { };

            bool isFristRequest = true;
            bool isContiune = true;
            string endCursor = string.Empty;

            while (isContiune)
            {
                GraphQLRequest request;
                request = new GraphQLRequest
                {
                    Query = @"
                            query ownerQuery($addressId: String!, $network: String!, $endCursor: String!) {
                              identity(address:$addressId, network: $network) {
                                followers(first: 50, network: $network, after: $endCursor) {
                                  pageInfo{
                                    endCursor
                                    hasNextPage
                                  }
                                  list {
                                        address
                                        avatar
                                        ens
                                        domain
                                  }
                                }
                              }
                            }",
                    Variables = new
                    {
                        addressId = chainAddress,
                        endCursor = endCursor,
                        network = network
                    }
                };

                if (isFristRequest)
                {
                    request.Query = request.Query.Replace(", $endCursor: String!", string.Empty);
                    request.Query = request.Query.Replace(", after: $endCursor", string.Empty);
                }

                if (!isFollower)
                {
                    request.Query = request.Query.Replace("followers", "followings");
                }

                if (network == "eth")
                {
                    request.Query = request.Query.Replace(", $network: String!", string.Empty);
                    request.Query = request.Query.Replace(", network: $network", string.Empty);
                }

                var graphQLResponse = await _client.SendQueryAsync<Cyber_Result>(request);
                if (isFollower)
                {
                    isContiune = graphQLResponse.Data.Identity.Followers.PageInfo.HasNextPage;
                    endCursor = graphQLResponse.Data.Identity.Followers.PageInfo.EndCursor;
                    resultList.AddRange(graphQLResponse.Data.Identity.Followers.List);
                }
                else
                {
                    isContiune = graphQLResponse.Data.Identity.Followings.PageInfo.HasNextPage;
                    endCursor = graphQLResponse.Data.Identity.Followings.PageInfo.EndCursor;
                    resultList.AddRange(graphQLResponse.Data.Identity.Followings.List);
                }

                isFristRequest = false;
            }

            if (resultList.Count == 1)
            {
                return new List<Cyber_Identity_Follow_List>();
            }

            resultList.ForEach(r =>
            {
                if (string.IsNullOrEmpty(r.Avatar)) { r.Avatar = _configuration["DefaultAvatar"]; }
            });
            return resultList;
        }

    }
}
