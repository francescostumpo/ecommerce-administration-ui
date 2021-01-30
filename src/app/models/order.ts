// tslint:disable:variable-name
export class Order {
  _id: string;
  _rev: string;
  totalPrice: number;
  customerName: string;
  customerSurname: string;
  customerAddress: string;
  customerEmail: string;
  phoneNumber: string;
  purchaseDate: Date;
  cart: Array<JSON>;
  purchaseLocation: string;
}
