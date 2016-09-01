using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WeatherWeb.Models;
using WeatherWeb.Service;

namespace WeatherWeb.ApiControllers
{
   
    [Route("api/[controller]")]
    public class WeatherController : Controller
    {
        private IOptions<AppSettings> _settings;
        public WeatherController(IOptions<AppSettings> settings)
        {
            _settings = settings;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var service = new AzureService(_settings);
            var history = await service.ReceiveMessagesAsync();
            return new ObjectResult(history);
        }
    }
}
