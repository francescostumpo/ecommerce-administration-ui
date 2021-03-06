import {StockVariant} from './stock-variant';

export class Stock {
  _id: string;
  _rev: string;
  productSubCategoryId: string;
  stockVariants: Array<StockVariant>;
}
