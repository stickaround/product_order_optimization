# Product Order Optimization

## Optimization Algorithm (algorithm.cs)

### Retrieve Unit of Measures for a Product:

- For each product in the order, retrieve all possible units of measure (e.g., EACH, PACK, CASE) using the GetUnitsForProductAsync method from the IProductStore interface.

### Sort Units of Measure:

- Sort these units by the number of singles they contain in descending order to prioritize larger units.

### Calculate Optimal Packing:

- Iterate over the order items and for each item, calculate the most efficient way to pack it using the largest units available until all items are packed.

## API Design (api_design.md)

- Endpoint: /optimize
- Method: POST
- Purpose: This endpoint accepts a list of products with their quantities and units of measure, and returns an optimized list for packing.

## UI

### Tech stack

- React (v18.3)
- TypeScript (v4.9.5)

  I just designed a generic React application using TypeScript that allows users to input orders for any type of product, specify quantities in different units of measure, and submit these orders to the optimization API.
  Also, I assumed that we have back-end service running with proper product store.
