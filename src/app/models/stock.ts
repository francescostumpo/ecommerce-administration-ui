import {StockVariant} from './stock-variant';

export class Stock {
  _id: string;
  _rev: string;
  productSubCategory: string;
  stockVariants: Array<StockVariant>;
}
