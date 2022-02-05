using Cyber_Tool.Models;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Tool.Helper
{
    public class CacheHelpter
    {
        private IMemoryCache _cache;

        private CyberConHelper _cyberConHelper;

        public CacheHelpter(IMemoryCache cache,
            CyberConHelper cyberConHelper)
        {
            _cache = cache;
            _cyberConHelper = cyberConHelper;
        }

        public async Task<Cyber_Result> GetCyberReusltByAddress(string address)
        {
            Cyber_Result cacheEntry;

            // Look for cache key.
            if (!_cache.TryGetValue(address, out cacheEntry))
            {
                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromMinutes(10));

                cacheEntry = await _cyberConHelper.GetBaseInfoByAddress(address);

                // Save data in cache.
                _cache.Set(address, cacheEntry, cacheEntryOptions);
            }

            return cacheEntry;
        }
    }
}
