import { Product } from './../../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
//import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  products: Product[];
  subcsribtion: Subscription;
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['title', 'price', 'action'];

  constructor(private productService: ProductService) {
    this.subcsribtion = this.productService.getAll()
    .subscribe( (products: Product[]) => {this.dataSource.data = this.products = products; })
  }

  ngOnDestroy(): void {
    this.subcsribtion.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filter(query: string){
    let filteredProducts;
    if(query){
      filteredProducts = this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    }else{
      filteredProducts = this.products;
    }
    this.dataSource.data = filteredProducts;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
