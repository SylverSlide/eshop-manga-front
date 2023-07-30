import { Component, OnInit } from '@angular/core';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CartService } from '../services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/authentication.service';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faBag = faCartShopping;
  faUser = faUser;
  cartItemCount: number = 0;
  showPopup: boolean = false;
  userDetails: User;
  firstname: string;

  private sidenav: MatSidenav;
  private cartItemCountSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartItemCountSubscription = this.cartService.cartItemCount.subscribe(
      (count) => {
        this.cartItemCount = count;
      }
    );

    this.getUserDetails();

    this.cartService.getShowPopup().subscribe((show) => {
      this.showPopup = show;
      if (show) {
        setTimeout(() => {
          this.showPopup = false;
        }, 3000);
      }
    });
  }

  getName(): string {
    const name = this.userDetails?.name;

    if (name) {
      return name;
    }

    return '';
  }
  getRole(): string {
    const role = this.userDetails?.role;

    if (role) {
      return role;
    }

    return '';
  }

  getFirstName(): string {
    const firstname = this.userDetails?.firstname;

    if (firstname) {
      return firstname.charAt(0).toUpperCase();
    }

    return '';
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userDetails = data.user;
      },
      (error) => {
        // Handle errors here
      }
    );
  }

  openSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
    this.sidenav.open();
  }

  logout() {
    this.authService.logout().subscribe(
      () => {},
      (error) => {}
    );
  }

  ngOnDestroy(): void {
    this.cartItemCountSubscription.unsubscribe();
  }

  isTokenInSession(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token; // Renvoie true si le token est en session, sinon renvoie false.
  }

  openDialog() {
    this.dialog.open(LoginModalComponent);
  }
}
