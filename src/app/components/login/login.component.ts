import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()) {
      this.isLoggedIn = true
    }
  }

  onSubmit(): void {
    const { username, password } = this.form

    this.authService.login(username, password)
      .subscribe({
        next: (res) => {
          this.storageService.saveToken(res.data)

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/products']).then(() => this.reloadPage());
        }, error: (e) => {
          this.errorMessage = e.error.message;
          this.isLoginFailed = true
        }
      })
  }

  goToRegister(): void {
    this.router.navigate(['/register'])
  }

  goToChangePassword(): void {
    this.router.navigate(['/change-password'])
  }

  reloadPage(): void {
    window.location.reload();
  }
}
