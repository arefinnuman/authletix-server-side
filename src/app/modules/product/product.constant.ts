/* eslint-disable no-unused-vars */
export enum DeliveryTimeEnum {
  TwoDays = '1 day to 3 days',
  AroundWeek = '7 days to 8 days',
  AroundMonth = '23 days to 28 days',
}

export enum LabelEnum {
  Available = 'available',
  StockOut = 'stock out',
}

export enum BrandEnum {
  Nike = 'nike',
  Adidas = 'adidas',
  Puma = 'puma',
}

export const deliveryTime = [
  '1 day to 3 days',
  '7 days to 8 days',
  '23 days to 28 days',
];

export const label = ['available', 'stock out'];

export const BrandName = ['nike', 'adidas', 'puma'];

export const productSearchableFields = ['name', 'location'];

export const productFilterableFields = [
  'searchTerm',
  'id',
  'location',
  'breed',
  'label',
  'category',
];
