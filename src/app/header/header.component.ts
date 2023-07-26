import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CartService } from '../services/cart.service';
import { Observable, Subscription } from 'rxjs';

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
  private cartItemCountSubscription: Subscription;

  constructor(private dialog: MatDialog, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItemCountSubscription = this.cartService.cartItemCount.subscribe(
      (count) => {
        this.cartItemCount = count;
      }
    );

    this.cartService.getShowPopup().subscribe((show) => {
      this.showPopup = show;
      if (show) {
        setTimeout(() => {
          this.showPopup = false;
        }, 3000); // 3000 ms = 3 secondes (modifier la durée selon vos besoins)
      }
    });
  }

  ngOnDestroy(): void {
    // N'oubliez pas de vous désabonner pour éviter les fuites de mémoire
    this.cartItemCountSubscription.unsubscribe();
  }

  openDialog() {
    this.dialog.open(LoginModalComponent);
  }
}
