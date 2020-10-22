import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService) {
    authService.appUser$.subscribe((appUser: AppUser) => this.appUser = appUser);
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout(){
    this.authService.logout();
  }
}
