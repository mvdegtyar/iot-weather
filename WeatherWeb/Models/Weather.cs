using System;

namespace WeatherWeb.Models
{
	public class Weather
	{
		public float Temperature { get; set; }

		public float Humidity { get; set; }

		public float Pressure { get; set; }

		public float Altitude { get; set; }

		public DateTime Time { get; set; }

		public string Location { get; set; }
	}
}