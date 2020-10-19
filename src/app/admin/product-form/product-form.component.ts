import { Observable, of } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<any[]>;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router) {
    this.categories$ = categoryService.getCategories();
  }

  save(product){
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
