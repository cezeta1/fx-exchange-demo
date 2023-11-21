export const currencies: Currency[] = [
  {
    id: 0,
    name: 'Australian Dollar',
    symbol: 'AUD',
  },
  {
    id: 0,
    name: 'Canadian Dollar',
    symbol: 'CAD',
  },
  {
    id: 0,
    name: 'US Dollar',
    symbol: 'USD',
  },
  {
    id: 0,
    name: 'British Pound Sterling',
    symbol: 'GBP',
  },
  {
    id: 0,
    name: 'NZ Dollar',
    symbol: 'NZD',
  },
];

export interface Currency {
  id: number;
  name: string;
  symbol: string;
}
