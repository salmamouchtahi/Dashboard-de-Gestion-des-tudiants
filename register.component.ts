import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private api: ApiService, private router: Router) { }

  register() {
    if (!this.email || !this.password) {
      this.message = "Veuillez remplir tous les champs";
      return;
    }

    this.api.register({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.message = res.message;
          // Redirige vers login après inscription
          setTimeout(() => this.router.navigate(['/login']), 1000);
        },
        error: (err) => {
          this.message = err.error.message || "Erreur lors de l'inscription";
        }
      });
  }
}