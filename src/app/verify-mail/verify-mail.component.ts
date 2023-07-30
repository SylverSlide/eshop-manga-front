import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';
import { faCheckCircle, faCancel } from '@fortawesome/free-solid-svg-icons';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.scss'],
})
export class VerifyMailComponent {
  verificationStatus: 'verifying' | 'success' | 'failed' = 'verifying';
  faCheck = faCheckCircle;
  faCancel = faCancel;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const token = params.get('token');
      if (token) {
        this.authService.verifyEmail(token).subscribe(
          () => {
            this.verificationStatus = 'success';
            this.openLoginModal();
          },
          (error) => {
            this.verificationStatus = 'failed';
          }
        );
      } else {
        this.verificationStatus = 'failed';
      }
    });
  }

  openLoginModal(): void {
    this.dialog.open(LoginModalComponent);
  }
}
