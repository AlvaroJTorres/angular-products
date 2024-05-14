import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: any = {
    name: null,
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const { name, username, email, password } = this.form

    this.authService.register(name, username, email, password)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.isSuccessful = true
          this.isSignUpFailed = false
          this.router.navigate(['/products']).then(() => this.reloadPage());
        },
        error: (e) => {
          this.errorMessage = e.error.message
          this.isSignUpFailed = true
        }
      })
  }

  goToLogin(): void {
    this.router.navigate(['/login'])
  }

  goToChangePassword(): void {
    this.router.navigate(['/change-password'])
  }

  reloadPage(): void {
    window.location.reload();
  }
}
