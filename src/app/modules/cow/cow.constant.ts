/* eslint-disable no-unused-vars */
export enum LocationEnum {
  Dhaka = 'Dhaka',
  Chattogram = 'Chattogram',
  Barishal = 'Barishal',
  Rajshahi = 'Rajshahi',
  Sylhet = 'Sylhet',
  Comilla = 'Comilla',
  Rangpur = 'Rangpur',
  Mymensingh = 'Mymensingh',
}

export enum BreedEnum {
  Brahman = 'Brahman',
  Nellore = 'Nellore',
  Sahiwal = 'Sahiwal',
  Gir = 'Gir',
  Indigenous = 'Indigenous',
  Tharparkar = 'Tharparkar',
  Kankrej = 'Kankrej',
}

export enum LabelEnum {
  ForSale = 'for sale',
  SoldOut = 'sold out',
}

export enum CategoryEnum {
  Dairy = 'Dairy',
  Beef = 'Beef',
  DualPurpose = 'Dual Purpose',
}

export const location = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const breed = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

export const label = ['for sale', 'sold out'];

export const category = ['Dairy', 'Beef', 'Dual Purpose'];

export const cowSearchableFields = ['name', 'location'];

export const cowFilterableFields = [
  'searchTerm',
  'id',
  'location',
  'breed',
  'label',
  'category',
];
