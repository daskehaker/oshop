import { UserService } from './../../user.service';
import { OrdersArray } from './../../models/ordresArray';
import { OrderService } from 'src/app/order.service';
import { Order } from './../../models/order';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnDestroy {
  orders: OrdersArray[] = [];
  subcsribtion: Subscription;
  dataSource = new MatTableDataSource<OrdersArray>();
  displayedColumns: string[] = ['customer', 'date', 'action'];

  constructor(private orderService: OrderService, private userService: UserService) {
    this.subcsribtion = orderService.getOrders()
    .subscribe((res: OrdersArray[] ) => {
      this.orders = this.dataSource.data = res;
    })
  }

  ngOnDestroy(): void {
    this.subcsribtion.unsubscribe();
  }
}
