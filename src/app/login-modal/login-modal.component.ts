import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InscriptionModalComponent } from '../inscription-modal/inscription-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginResponse } from '../models/login-response';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  faUserLock = faUserLock;
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    public dialogRef: MatDialogRef<InscriptionModalComponent>,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs du formulaire.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response: LoginResponse) => {
        const token = response.token;
        this.dialog.closeAll();
        sessionStorage.setItem('token', token);
        this.router.navigate(['']);
      },
      (error) => {
        this.errorMessage =
          'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.';
      }
    );
  }

  afficherInscription(event: Event): void {
    event: Event;
    event.preventDefault();
    // Fermer le MatDialog actuel
    this.dialogRef.close();

    // Ouvrir un nouveau MatDialog avec le composant InscriptionComponent
    const dialogInscription = this.dialog.open(InscriptionModalComponent);

    // Vous pouvez ajouter des gestionnaires d'événements ici si nécessaire
    dialogInscription.afterClosed().subscribe((result) => {});
  }
}
