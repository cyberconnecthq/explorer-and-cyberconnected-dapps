using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Tool.Helper
{
    public class DateHelper
    {
        public static string GetFeedDateStr(DateTime createTime)
        {
            DateTime dtCreated = Convert.ToDateTime(createTime);
            TimeSpan ts = DateTime.Now - dtCreated;
            string dateStr = string.Empty;
            string hourStr = string.Empty;
            if (ts.Days > 1)
            {
                dateStr = $"{ts.Days} days ";
            }
            else if (ts.Days == 1)
            {
                dateStr = $"{ts.Days} day ";
            }

            if (ts.Hours > 1)
            {
                hourStr = $"{ts.Hours} hours ago";
            }
            else
            {
                hourStr = $"{ts.Hours} hour ago";
            }

            return dateStr + hourStr;
        }
    }
}
