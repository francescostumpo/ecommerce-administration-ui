import {Component, OnInit, ViewChild} from '@angular/core';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {Order} from '../../models/order';
import {Subject} from 'rxjs';
import {OrderService} from '../../services/order.service';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  isPanelUpdateVisible = false;
  order: Order;
  orderList: Array<Order>;
  faPencilAlt = faPencilAlt;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  searchStatus: string;

  constructor(private orderService: OrderService) {
    this.order = new Order();
    this.searchStatus = 'TUTTI';
  }

  ngOnInit(): void {
    this.dtOptions = {
      ordering: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getAllOrders();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(res => {
      // @ts-ignore
      this.orderList = res.body;
      this.dtTrigger.next();
      console.log('Available Orders: ', this.orderList);
    });
  }

  moveForUpdate(order: Order): void {
    this.order = order;
    this.isPanelUpdateVisible = true;
  }

  updatePurchase(order: Order): void {
    this.orderService.updateOrder(order, 'MANAGEMENT').subscribe(res => {
      this.rerender();
      // @ts-ignore
      alert(res.body.message);
      this.getAllOrders();
      this.isPanelUpdateVisible = false;
    });
  }

  // tslint:disable-next-line:typedef
  getOrders(): void {
    this.rerender();
    this.isPanelUpdateVisible = false;
    if (this.searchStatus === 'TUTTI'){
      this.getAllOrders();
    }else {
      this.orderService.getOrderByStatus(this.searchStatus).subscribe(res => {
        // @ts-ignore
        this.orderList = res.body;
        this.dtTrigger.next();
        console.log('Available Orders: ', this.orderList);
      });
    }
  }

  deleteNullValues(detail: JSON): JSON {
    $.each(detail, (key, value) => {
      // @ts-ignore
      if (value === '' || value === null || key === 'productSubCategoryId' || key === 'tags' || key === 'productDescription'){
        delete detail[key];
      }
    });
    return detail;
  }
}
