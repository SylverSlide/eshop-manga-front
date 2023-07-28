import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';
import { faCheckCircle, faCancel } from '@fortawesome/free-solid-svg-icons';

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
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const token = params.get('token');
      console.log('token-> ', token);
      if (token) {
        this.authService.verifyEmail(token).subscribe(
          () => {
            this.verificationStatus = 'success';
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
}
