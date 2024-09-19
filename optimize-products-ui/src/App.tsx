import React, { useState } from "react";
import "./App.css";
import { OrderItem, OptimizedResult } from "./types";

const App: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [productName, setProductName] = useState("");
  const [unitName, setUnitName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [results, setResults] = useState<OptimizedResult[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

const handleAddItem = () => {
  // check if the form is valid
  if (!productName || !unitName || !quantity) {
    alert('Input valid order request');
    return;
  }

  // check if the product already exists in the orderItems array
  const productIndex = orderItems.findIndex(
    (item) => item.productName === productName
  );

  if (productIndex !== -1) {
    // if product exists, now check if the unit also exists for this product
    const unitIndex = orderItems[productIndex].units.findIndex(
      (unit) => unit.name === unitName
    );

    if (unitIndex !== -1) {
      // if unit exists, update the quantity
      const newOrderItems = [...orderItems];
      newOrderItems[productIndex].units[unitIndex].quantity += quantity;
      setOrderItems(newOrderItems);
    } else {
      // if unit does not exist, add new unit
      const newOrderItems = [...orderItems];
      newOrderItems[productIndex].units.push({ name: unitName, quantity });
      setOrderItems(newOrderItems);
    }
  } else {
    // if product does not exist, add new product and unit
    const newItem: OrderItem = {
      productName,
      units: [{ name: unitName, quantity }],
    };
    setOrderItems([...orderItems, newItem]);
  }

  // clear inputs
  setProductName("");
  setUnitName("");
  setQuantity(0);
};

  const handleOptimize = async () => {
    // check if there are any order items.
    if (!orderItems.length) return;
    
    try {
      setResults([]);
      setIsOptimizing(true);

      const response = await fetch("https://backend_api_url/optimize", { // should be replaced with real backend url
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: orderItems }),
      });
      const data: OptimizedResult[] = await response.json();
      setResults(data);
    } catch (error) {
      alert("Failed to fetch optimized results");
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="App">
      <h1>Product Order Optimization</h1>
      <div>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          type="text"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          placeholder="Unit of Measure"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          placeholder="Quantity"
        />
        <button onClick={handleAddItem}>Add Item</button>
        <button onClick={handleOptimize}>Optimize Order</button>
      </div>
      <h2>Order Items</h2>
      <ul>
        {orderItems.map((item, index) => (
          <li key={index}>
            {item.productName}:{" "}
            {item.units
              .map((unit) => `${unit.name} x ${unit.quantity}`)
              .join(", ")}
          </li>
        ))}
      </ul>
      <h2>Optimized Results</h2>
      {isOptimizing ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {result.productName} - {result.unitOfMeasure} x {result.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results to display.</p>
      )}
    </div>
  );
};

export default App;
