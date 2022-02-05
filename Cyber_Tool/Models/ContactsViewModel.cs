using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Tool.Models
{
    public class ContactsViewModel
    {
        public List<Cyber_Identity_Follow_List> FollowersList { get; set; }

        public List<Cyber_Identity_Follow_List> FollowingsList { get; set; }

        public List<Cyber_Identity_Follow_List> UnfollowList { get; set; }
    }
}
