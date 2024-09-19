using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class Order
{
    public static async Task<List<OrderItem>> ReduceUnitsAsync(IEnumerable<OrderItem> items, IProductStore store)
    {
        List<OrderItem> optimizedOrder = new List<OrderItem>();
        
        foreach (var item in items)
        {
            var units = await store.GetUnitsForProductAsync(item.ProductName);
            var sortedUnits = units.OrderByDescending(u => u.SinglesPerUnit).ToList();
            int remainingQuantity = item.Quantity;

            foreach (var unit in sortedUnits)
            {
                int useUnitCount = remainingQuantity / unit.SinglesPerUnit;
                if (useUnitCount > 0)
                {
                    optimizedOrder.Add(new OrderItem { ProductName = item.ProductName, UnitOfMeasure = unit.Name, Quantity = useUnitCount });
                    remainingQuantity %= unit.SinglesPerUnit;
                }
            }

            // In case there are any leftovers that cannot be exactly packed by available units
            if (remainingQuantity > 0)
            {
                // We have to assume that there's always an 'EACH' or smallest unit to handle leftovers
                optimizedOrder.Add(new OrderItem { ProductName = item.ProductName, UnitOfMeasure = "EACH", Quantity = remainingQuantity });
            }
        }

        return optimizedOrder;
    }
}

public interface IProductStore
{
    Task<List<UnitOfMeasure>> GetUnitsForProductAsync(string productName);
}

public record UnitOfMeasure(string Name, int SinglesPerUnit);
public record OrderItem(string ProductName, string UnitOfMeasure, int Quantity);