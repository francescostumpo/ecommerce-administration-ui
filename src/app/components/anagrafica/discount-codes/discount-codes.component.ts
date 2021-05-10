import { Component, OnInit } from '@angular/core';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {DiscountCode} from '../../../models/discount-code';

import {DiscountCodeService} from '../../../services/discount-code.service';


@Component({
  selector: 'app-discount-codes',
  templateUrl: './discount-codes.component.html',
  styleUrls: ['./discount-codes.component.css']
})
export class DiscountCodesComponent implements OnInit {
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;
  faPencilAlt = faPencilAlt;
  discountCode: DiscountCode;
  discountCodeForUpdate: DiscountCode;
  discountCodeList: Array<DiscountCode>;
  constructor(private discountCodeService: DiscountCodeService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getAllDiscountCodes();
  }

  toggleCreateOrUpdatePanel(action: string): void {
    if (action === 'update') {
      this.isPanelCreateVisible = false;
      this.isPanelUpdateVisible = !this.isPanelUpdateVisible;
    } else {
      this.isPanelUpdateVisible = false;
      this.isPanelCreateVisible = !this.isPanelCreateVisible;
    }
  }

  moveForUpdate(discountCode: DiscountCode): void {
    this.discountCodeForUpdate = discountCode;
    this.toggleCreateOrUpdatePanel('update');
  }

  createOrUpdateDiscountCode(action: string): void {
    let discountCode: DiscountCode;
    if (action === 'update') {
      discountCode = this.discountCodeForUpdate;
    } else {
      discountCode = this.discountCode;
    }
    this.discountCodeService.createOrUpdateDiscountCode(discountCode).subscribe(res => {
      // @ts-ignore
      console.log('Response: ', res.body);
      // @ts-ignore
      alert(res.body.message);
      this.toggleCreateOrUpdatePanel(action);
      // @ts-ignore
      this.tag = {};
      this.getAllDiscountCodes();
    }, error => {
      alert(error.status + ' ' + error.statusText);
      this.getAllDiscountCodes();
    });
  }

  getAllDiscountCodes(): void {
    this.discountCodeService.getAllDiscountCodes().subscribe(res => {
      // @ts-ignore
      this.discountCodeList = res.body;
      console.log('Available DiscountCodes: ', this.discountCodeList);
    });
  }

}
