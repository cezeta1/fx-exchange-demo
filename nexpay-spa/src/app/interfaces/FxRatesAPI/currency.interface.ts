export const currencies: Currency[] = [
  {
    id: 0,
    name: 'Australian Dollar',
    symbol: 'AUD',
  },
  {
    id: 1,
    name: 'Canadian Dollar',
    symbol: 'CAD',
  },
  {
    id: 2,
    name: 'US Dollar',
    symbol: 'USD',
  },
  {
    id: 3,
    name: 'British Pound Sterling',
    symbol: 'GBP',
  },
  {
    id: 4,
    name: 'NZ Dollar',
    symbol: 'NZD',
  },
];

export interface Currency {
  id: number;
  name: string;
  symbol: string;
}
