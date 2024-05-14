import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

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

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const { name, username, email, password } = this.form

    this.authService.register(name, username, email, password)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.isSuccessful = true
          this.isSignUpFailed = false
        },
        error: (e) => {
          this.errorMessage = e.error.message
          this.isSignUpFailed = true
        }
      })
  }
}
