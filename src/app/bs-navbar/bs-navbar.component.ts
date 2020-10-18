import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent{
  appUser: AppUser;
  constructor(private authService: AuthService) {
    authService.appUser$.subscribe((appUser: AppUser) => this.appUser = appUser);
  }

  logout(){
    this.authService.logout();
  }
}
