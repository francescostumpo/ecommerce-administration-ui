// tslint:disable:variable-name
import {SubCategoryOption} from './sub-category-option';

export class SubCategory {
  _id: string;
  _rev: string;
  name: string;
  imageUrl: string;
  categoryId: string;
  options: SubCategoryOption;

}
