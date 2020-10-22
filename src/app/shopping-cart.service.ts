import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    let cart = this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
      map((action:any) => {
        const key = action.key;
        const items = action.payload.val().items;
        return new ShoppingCart(key, items);
      })
    )
    return cart;
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  addItem(product) {
    this.updateItemQuantity(product, 1);
  }

  removeItem(product) {
    this.updateItemQuantity(product, -1);
  }

  async updateItemQuantity(product, change ) {
    //delete product.id;
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.id);
    item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
      //console.log(i);
      let quantity = (i.payload.val() ? i.payload.val().quantity: 0) + change;
      if (quantity === 0) item.remove();
      else (item.update({
           //key: product.$key,
           title: product.title,
           imageUrl: product.imageUrl,
           price: product.price,
           quantity: quantity
          }));
    });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  public create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
}
