import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) { }

  login() {
    this.api.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.auth.login();               // ✅ connecté
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('Email ou mot de passe incorrect');
      }
    });
  }
}