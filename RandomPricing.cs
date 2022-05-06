using System;
namespace StockPriceApp
{
    // Class for handling the random pricing logic. It is give a minimum and maximum values and it returns a random double price adhering to the bounds. 
    public class RandomPricing : Random
    {
        public RandomPricing(int seed) : base(seed) { }

        public string NextDouble(double minimum, double maximum)
        {
            // Since NextDouble only return a random double between 0.0 and 1.0, we have to add some additional logic to randomize for our given range. 
            var doublePrice = base.NextDouble() * (maximum - minimum) + minimum;
            var formattedPrice = string.Format("{0:F2}",doublePrice);
            return formattedPrice;
        }
    }
}

