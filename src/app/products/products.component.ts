import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;
  cart;
  subscription :Subscription

  constructor(
    productService: ProductService,
    private cartService: ShoppingCartService,
    route: ActivatedRoute) {
    productService.getAll()
    .subscribe((products: Product[]) =>{
      this.products = products;

      route.queryParams.subscribe(params => {
        this.category = params["category"]
        this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products
      })
    });
  }

  async ngOnInit(){
    this.subscription = (await this.cartService.getCart()).subscribe(cart =>{this.cart = cart;})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
