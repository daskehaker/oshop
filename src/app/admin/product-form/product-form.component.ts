import { Observable, of } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<any[]>;

  constructor(private productService: ProductService, categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }

  save(product){
    this.productService.create(product);
  }

}
