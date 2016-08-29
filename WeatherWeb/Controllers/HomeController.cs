using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeatherWeb.Models;
using WeatherWeb.Service;

namespace WeatherWeb.Controllers
{
    public class HomeController : Controller
    {
        public async Task<IActionResult> Index()
        {
	        var model = new WeatherViewModel
	        {
		        History = await AzureService.ReceiveMessagesAsync()
			};

            return View(model);
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
