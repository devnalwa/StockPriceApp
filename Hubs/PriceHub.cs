using Microsoft.AspNetCore.SignalR;

namespace StockPriceApp.Hubs
{
    // Establishing our SignalR hub
    public class PriceHub : Hub
    {
        // Creating an instance of RandomPricing class that will be used by the HubMethods to retrieve that random prices in the range they give it. 
        // Used time for seeding to keep it random. 
        private RandomPricing randomNums = new RandomPricing(DateTime.Now.Second);


        // Methods that retrieve price from RandomPricing instance and send it over to all connected clients in real time through established SignalR conenction on client side.
        public async Task SendMsftPrice()
        {
            var price = randomNums.NextDouble(300.00, 305.00);
            await Clients.All.SendAsync("ReceivePriceMsft", price);
        }

        public async Task SendAmznPrice()
        {
            var price = randomNums.NextDouble(3200.00, 3300.00);
            await Clients.All.SendAsync("ReceivePriceAmzn",price);
        }

        public async Task SendAaplPrice()
        {
            var price = randomNums.NextDouble(170.00, 175.00);
            await Clients.All.SendAsync("ReceivePriceAapl", price);
        }
    }
}
