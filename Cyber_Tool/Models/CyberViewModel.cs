using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Tool.Models
{
    public class CyberPageItem
    {
        public string Address { get; set; }

        public string AddressLink { get; set; }
    }

    public class Cyber_Result
    {
        public CyberViewModel Identity { get; set; }
    }

    public class CyberViewModel
    {
        public string Avatar { get; set; }

        public string Ens { get; set; }

        public int FollowingCount { get; set; }

        public int FollowerCount { get; set; }

        public string Address { get; set; }

        public string Domain { get; set; }

        public Cyber_Followers Followers { get; set; }

        public Cyber_Followers Followings { get; set; }
    }

    public class Cyber_Followers
    {
        public Cyber_PageInfo PageInfo { get; set; }

        public List<Cyber_Identity_Follow_List> List { get; set; }
    }

    public class Cyber_PageInfo
    {
        public string EndCursor { get; set; }

        public bool HasNextPage { get; set; }
    }

    public class Cyber_Identity_Follow_List
    {
        public string Address { get; set; }

        public string Avatar { get; set; }

        public string Ens { get; set; }

        public string Domain { get; set; }

        private sealed class Cyber_Identity_Follow_List_EqualityComparer : IEqualityComparer<Cyber_Identity_Follow_List>
        {
            public bool Equals(Cyber_Identity_Follow_List x, Cyber_Identity_Follow_List y)
            {
                if (ReferenceEquals(x, y)) return true;
                if (ReferenceEquals(x, null)) return false;
                if (ReferenceEquals(y, null)) return false;
                if (x.GetType() != y.GetType()) return false;
                return x.Address == y.Address;
            }

            public int GetHashCode(Cyber_Identity_Follow_List obj)
            {
                return (obj.Address != null ? obj.Address.GetHashCode() : 0);
            }
        }

        public static IEqualityComparer<Cyber_Identity_Follow_List> Comparer { get; } = new Cyber_Identity_Follow_List_EqualityComparer();

    }
}
