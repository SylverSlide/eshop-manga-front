import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CartService } from '../services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/authentication.service';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  closeResult: string;
  faBag = faCartShopping;
  faUser = faUser;
  cartItemCount: number = 0;
  showPopup: boolean = false;
  userDetails: User;
  firstname: string;

  private sidenav: MatSidenav;
  private cartItemCountSubscription: Subscription;

  @ViewChild('offCanvasContent') offcanvasContent: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.cartItemCountSubscription = this.cartService.cartItemCount.subscribe(
      (count) => {
        this.cartItemCount = count;
      }
    );

    this.cartService.getShowPopup().subscribe((show) => {
      if (show) {
      }
    });
  }

  openOffcanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {
      scroll: true,
      position: 'end',
    });
  }

  closeOffcanvas() {
    this.offcanvasService.dismiss();
  }

  getName(): string {
    return this.userService.getUser()?.name ?? '';
  }
  getRole(): string {
    return this.userService.getUser()?.role ?? '';
  }

  getFirstName(): string {
    const firstname = this.userService.getUser()?.firstname;
    return firstname ? firstname.charAt(0).toUpperCase() : '';
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
