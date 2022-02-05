using Cyber_Tool.Helper;
using Cyber_Tool.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Tool.Controllers
{
    public class ContactsController : Controller
    {
        private CyberConHelper _cyberConHelper;

        public ContactsController(CyberConHelper cyberConHelper)
        {
            _cyberConHelper = cyberConHelper;
        }


        public async Task<IActionResult> Me(string id)
        {
            ContactsViewModel contactsViewModel = new ContactsViewModel()
            {
                FollowingsList = new List<Cyber_Identity_Follow_List>(),
                FollowersList = new List<Cyber_Identity_Follow_List>(),
                UnfollowList = new List<Cyber_Identity_Follow_List>()
            };

            try
            {
                List<Cyber_Identity_Follow_List> followersList = await _cyberConHelper.GetFollowList(id, true);
                List<Cyber_Identity_Follow_List> followeingsList = await _cyberConHelper.GetFollowList(id, false);
                List<Cyber_Identity_Follow_List> unfollowList =
                    followersList.Except(followeingsList, Cyber_Identity_Follow_List.Comparer).ToList();

                contactsViewModel = new ContactsViewModel()
                {
                    FollowingsList = followeingsList,
                    FollowersList = followersList,
                    UnfollowList = unfollowList
                };
            }
            catch (Exception ex)
            {
            }

            return View(contactsViewModel);
        }
    }
}
