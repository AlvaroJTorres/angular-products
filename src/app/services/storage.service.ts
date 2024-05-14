import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear()
  }

  public saveToken(user: any): void {
    window.sessionStorage.removeItem('auth-user')
    window.sessionStorage.setItem('auth-user', user.accessToken)
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem('auth-user');
    console.log(user)
    if (user) {
      return true;
    }

    return false;
  }
}
