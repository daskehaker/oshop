import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Order } from 'src/app/models/order';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;

  shipping: any = {};
  userSubscription: Subscription;
  userId: string;
  userName: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
      this.userName = user.displayName;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.userName, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
