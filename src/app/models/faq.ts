// tslint:disable:variable-name
import {SubParagraph} from './subParagraph';

export class Faq {
  _id: string;
  _rev: string;
  position: string;
  question: string;
  answer: string;
  imageUrl: string;
  subParagraphs: Array<SubParagraph>;
}
