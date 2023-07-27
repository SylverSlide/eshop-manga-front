import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.scss'],
})
export class VerifyMailComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Récupérer le token de vérification d'e-mail depuis les paramètres de l'URL
    this.route.queryParams.subscribe((params: any) => {
      const token = params['token'];

      if (token) {
        // Stocker le token JWT dans le sessionStorage
        sessionStorage.setItem('token', token);

        // Appeler la méthode de vérification de l'e-mail
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
