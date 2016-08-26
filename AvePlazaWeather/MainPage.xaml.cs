using System;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;
using AvePlazaWeather.Model;
using Microsoft.Azure.Devices.Client;
using Newtonsoft.Json;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace AvePlazaWeather
{
	public sealed partial class MainPage : Page
	{
		private DispatcherTimer _timer;
		private BuildAzure.IoT.Adafruit.BME280.BME280Sensor _bme280;
		//DeviceClient _azureClient;

		const float SeaLevelPressure = 1022.00f;
		const string IotHubUri = "AvePlazaWeather.azure-devices.net";
		const string DeviceName = "RaspberryPi3";
		const string DeviceKey = "YOUR_PRIMARY_KEY";

		public MainPage()
		{
			this.InitializeComponent();
		}

		protected override async void OnNavigatedTo(NavigationEventArgs e)
		{
			Debug.WriteLine("OnNavigatedTo");
			base.OnNavigatedTo(e);

			_bme280 = new BuildAzure.IoT.Adafruit.BME280.BME280Sensor();
			await _bme280.Initialize();
			Debug.WriteLine("BME280Sensor is initialized");
			
			_timer = new DispatcherTimer();
			_timer.Interval = TimeSpan.FromMinutes(30);
			_timer.Tick += CheckWeather;

			_timer.Start();

			CheckWeather(this, null);
		}

		private async void CheckWeather(object sender, object e)
		{
			Debug.WriteLine("Start reading temperature");

			var temp = await _bme280.ReadTemperature();
			var humidity = await _bme280.ReadHumidity();
			var pressure = await _bme280.ReadPressure();
			var altitude = await _bme280.ReadAltitude(SeaLevelPressure);

			Debug.WriteLine("Temp: {0} deg C", temp);
			Debug.WriteLine("Humidity: {0} %", humidity);
			Debug.WriteLine("Pressure: {0} Pa", pressure);
			Debug.WriteLine("Altitude: {0} m", altitude);

			var weather = new Weather
			{
				Temperature = temp,
				Humidity = humidity,
				Pressure = pressure,
				Altitude = altitude,
				Time = DateTime.Now,
				Location = "6th floor!"
			};

			await SendToAzure(weather);
		}

		private async Task SendToAzure(Weather data)
		{
			var messageString = JsonConvert.SerializeObject(data);
			var message = new Message(Encoding.ASCII.GetBytes(messageString));
			Debug.WriteLine("{0} > Sending message: {1}", DateTime.Now, messageString);

			DeviceClient azureClient = DeviceClient.Create(
				IotHubUri, new DeviceAuthenticationWithRegistrySymmetricKey(DeviceName, DeviceKey));

			try
			{
				await azureClient.SendEventAsync(message);
			}
			catch (Exception ex)
			{
				Debug.WriteLine(ex.ToString());
			}
		}
	}
}
