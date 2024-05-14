import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-products';
  isLoggedIn = false;

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.storageService.clean()

          this.router.navigate(['/login']).then(() => this.reloadPage())
        },
        error: (e) => console.error(e)
      })
  }

  reloadPage(): void {
    window.location.reload();
  }
}
