using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.ServiceBus.Messaging;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WeatherWeb.Models;

namespace WeatherWeb.Service
{
	public class AzureService
	{
		static string ConnectionString = "";
		static string iotHubD2cEndpoint = "messages/events";
		static EventHubClient _eventHubClient;

		public static async Task<List<Weather>> ReceiveMessagesAsync()
		{
			List<Weather> result = new List<Weather>();

			_eventHubClient = EventHubClient.CreateFromConnectionString(ConnectionString, iotHubD2cEndpoint);
			var d2cPartitions = _eventHubClient.GetRuntimeInformation().PartitionIds;

			string partition = d2cPartitions.Last();
			{
				var eventHubReceiver = _eventHubClient.GetDefaultConsumerGroup().CreateReceiver(
					partition, DateTime.UtcNow.AddDays(-3));
				EventData eventData = await eventHubReceiver.ReceiveAsync();
				if (eventData == null)
				{
					return result;
				}

				string data = Encoding.UTF8.GetString(eventData.GetBytes());
				var weather = JsonConvert.DeserializeObject<Weather>(data);
				result.Add(weather);
			}

			return result;
		}


	}
}