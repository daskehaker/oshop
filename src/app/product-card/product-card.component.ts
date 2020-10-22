import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input("product") product: Product
  @Input("show-actions") actions = true;
  @Input("shopping-cart") shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product){
    this.cartService.addItem(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeItem(product)
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.itemsMap[this.product.id];
    return item ? item.quantity : 0;
  }

}
