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
    public class CarsController : Controller
    {
        private CarService _carService;

        public CarsController(CarService carService)
        {
            _carService = carService;
        }

        // GET: api/cars
        [HttpGet]
        public IEnumerable<Car> Get()
        {
            return _carService.ListCars();
        }

        // GET api/cars/5
        [HttpGet("{id}")]
        public Car Get(int id)
        {
            return _carService.FindCar(id);
        }

        // GET: api/cars
        [HttpGet("search/{searchText}")]
        public IEnumerable<Car> Get(string searchText)
        {
            return _carService.SearchCars(searchText);
        }
    }
}
