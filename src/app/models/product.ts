import {Tag} from './tag';
import {Variant} from './variant';
// tslint:disable:variable-name
export class Product {
 _id: string;
 _rev: string;
 name: string;
 categoryId: string;
 productSubCategoryId: string;
 productSubCategoryName: string;
 productDescription: string;
 productModel: string;
 price: number;
 instagramPublished: boolean;
 tags: Array<string>;
 variants: Array<Variant>;
}
