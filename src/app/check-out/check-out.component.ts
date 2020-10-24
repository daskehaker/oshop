import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
