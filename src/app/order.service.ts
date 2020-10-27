import { query } from '@angular/animations';
import { OrdersArray } from './models/ordresArray';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Order } from './models/order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();

    return result;
  }

  getOrders() {
    return this.db.list("/orders").snapshotChanges()
    .pipe(map(res => res.map((p: any) => ({id: p.key, ...p.payload.val()}) as OrdersArray)));
  }

  getOrderById(id: string){
    return this.db.object("/orders/" + id).valueChanges();
  }
}
