using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WeatherWeb.Models;
using WeatherWeb.Service;

namespace WeatherWeb.Controllers
{
    public class HomeController : Controller
    {
        private IOptions<AppSettings> _settings;
        public HomeController(IOptions<AppSettings> settings)
        {
            _settings = settings;
        }
        public async Task<IActionResult> Index()
        {
            var service = new AzureService(_settings);

            var model = new WeatherViewModel
	        {
		        History = await service.ReceiveMessagesAsync()
			};

            return View(model);
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
