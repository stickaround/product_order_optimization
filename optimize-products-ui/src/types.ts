export interface UnitOfMeasure {
  name: string;
  quantity: number;
}

export interface OrderItem {
  productName: string;
  units: UnitOfMeasure[];
}

export interface OptimizedResult {
  productName: string;
  unitOfMeasure: string;
  quantity: number;
}
