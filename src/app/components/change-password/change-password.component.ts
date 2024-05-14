import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Location, NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, NgFor],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  form: any = {
    username: null,
    new_password: null,
    confirmed_password: null
  };
  isSuccessful = false;
  isChangePasswordFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private location: Location) { }

  onSubmit(): void {
    const { username, new_password, confirmed_password } = this.form

    this.authService.changePassword(username, new_password, confirmed_password)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.isSuccessful = true
          this.isChangePasswordFailed = false
          this.router.navigate(['/login'])
        },
        error: (e) => {
          this.errorMessage = e.error.message
          this.isChangePasswordFailed = true
        }
      })
  }

  goBack(): void {
    this.location.back()
  }
}
