import { Product } from './../../models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subcsribtion: Subscription;
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['title', 'price', 'action'];

  constructor(private productService: ProductService) {
    this.subcsribtion = this.productService.getAll()
    .subscribe( (products: Product[]) => {this.dataSource.data = this.products = products; console.log(products)})
  }
  ngOnDestroy(): void {
    this.subcsribtion.unsubscribe();
  }


  ngOnInit(): void {
  }

}
