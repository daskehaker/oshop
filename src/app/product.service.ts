import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('products').snapshotChanges()
    .pipe(map(res => res.map((p: any) => ({id: p.key, ...p.payload.val()}) as Product)));
  }
}
