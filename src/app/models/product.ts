import {Tag} from './tag';
import {Variant} from './variant';
// tslint:disable:variable-name
export class Product {
 _id: string;
 _rev: string;
 name: string;
 categoryId: string;
 categoryName: string;
 productSubCategoryId: string;
 productSubCategoryName: string;
 productDescription: string;
 productModel: string;
 price: number;
 tags: Array<Tag>;
 variants: Array<Variant>;
}
