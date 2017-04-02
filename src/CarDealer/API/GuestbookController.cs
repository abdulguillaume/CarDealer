using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarDealer.Services;
using CarDealer.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CarDealer.API
{
    [Route("api/[controller]")]
    public class GuestbookController : Controller
    {
        private GuestbookService _guestbookService;

        public GuestbookController(GuestbookService guestbookService)
        {
            _guestbookService = guestbookService;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<GuestbookEntry> Get()
        {
            return _guestbookService.ListEntries();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]GuestbookEntry entry)
        {
            _guestbookService.SaveEntry(entry);
        }

    }
}
