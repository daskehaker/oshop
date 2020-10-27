import { OrdersArray } from './../models/ordresArray';
import { OrderService } from 'src/app/order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  userSubscription: Subscription;
  subscription: Subscription;
  userId: string
  userName: string
  orders: OrdersArray[];
  dataSource = new MatTableDataSource<OrdersArray>();
  displayedColumns: string[] = ['date', 'action'];

  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
      this.userName = user.displayName;
    });
    this.subscription = this.orderService.getOrders()
    .subscribe((res: OrdersArray[] ) => {
      this.orders = this.dataSource.data = res.filter((o: OrdersArray) => o.userId == this.userId )
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

}
