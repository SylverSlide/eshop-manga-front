import { Component, OnInit } from '@angular/core';
import { InscriptionModalComponent } from '../inscription-modal/inscription-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  faUserLock = faUserLock;
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<InscriptionModalComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        const token = response.token;
        this.dialog.closeAll();
        sessionStorage.setItem('token', token);
      },
      (error) => {
        console.error('Erreur de connexion', error);
      }
    );
  }

  afficherInscription(): void {
    // Fermer le MatDialog actuel
    this.dialogRef.close();

    // Ouvrir un nouveau MatDialog avec le composant InscriptionComponent
    const dialogRef = this.dialog.open(InscriptionModalComponent);

    // Vous pouvez ajouter des gestionnaires d'événements ici si nécessaire
    dialogRef.afterClosed().subscribe((result) => {
      console.log("Dialog d'inscription fermée");
    });
  }
}
