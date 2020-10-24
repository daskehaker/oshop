import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input("product") product: Product
  @Input("shopping-cart") shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product){
    this.cartService.addItem(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeItem(product)
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;
    let quantity = this.shoppingCart.getQuantity(this.product);
    return quantity ? quantity : 0;
  }
}
