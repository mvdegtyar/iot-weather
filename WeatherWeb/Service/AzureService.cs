using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.ServiceBus.Messaging;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using WeatherWeb.Models;

namespace WeatherWeb.Service
{
    public class AzureService
    {
        readonly string _connectionString;
        string iotHubD2cEndpoint = "messages/events";
        
        public AzureService(IOptions<AppSettings> settings)
        {
            _connectionString = settings.Value.EventHubConnectionString;
        }
        public async Task<List<Weather>> ReceiveMessagesAsync()
        {
            List<Weather> result = new List<Weather>();
            var eventHubClient = EventHubClient.CreateFromConnectionString(_connectionString, iotHubD2cEndpoint);
            var d2cPartitions = eventHubClient.GetRuntimeInformation().PartitionIds;

            string partition = d2cPartitions.Last();

            var eventHubReceiver = eventHubClient.GetDefaultConsumerGroup().CreateReceiver(partition, DateTime.UtcNow.AddDays(-3));
            var runtimeInfo = await eventHubClient.GetPartitionRuntimeInformationAsync(partition);
            var maxSequenceNumber = runtimeInfo.LastEnqueuedSequenceNumber;

            while (true)
            {
                var eventsData = (await eventHubReceiver.ReceiveAsync(2 * 24 * 3)).ToList();
                if (!eventsData.Any())
                {
                    break;
                }

                foreach (var eventData in eventsData)
                {
                    string data = Encoding.UTF8.GetString(eventData.GetBytes());
                    var weather = JsonConvert.DeserializeObject<Weather>(data);
                    result.Add(weather);
                }

                if (eventsData.Last().SequenceNumber == maxSequenceNumber)
                {
                    break;
                }
            }
            await eventHubReceiver.CloseAsync();
            return result.OrderByDescending(m => m.Time).ToList();
        }
    }
}