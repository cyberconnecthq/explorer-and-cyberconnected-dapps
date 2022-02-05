using Cyber_Tool.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Tool.Models
{
    public class PoapModel
    {
        public PoapEventModel Event { get; set; }

        public Int64 TokenId { get; set; }

        public string Owner { get; set; }

        public string Created { get; set; }

        public DateTime Created_DT
        {
            get
            {
                // this is utc time need to add 8 hours
                return Convert.ToDateTime(this.Created).AddHours(8);
            }
        }

        public string FeedsCreateStr
        {
            get
            {
                DateTime createDt = Convert.ToDateTime(this.Created).AddHours(8);
                return DateHelper.GetFeedDateStr(createDt);
            }
        }
    }

    public class PoapEventModel
    {
        public Int64 Id { get; set; }

        public string Fancy_id { get; set; }

        public string Name { get; set; }

        public string Event_url { get; set; }

        public string Image_url { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string Description { get; set; }

        public int Year { get; set; }

        public string Start_Date { get; set; }

        public string End_Date { get; set; }

        public string Expiry_Date { get; set; }

        public int Supply { get; set; }
    }
}
