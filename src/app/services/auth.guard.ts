import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from './storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService)
  const router = inject(Router)
  
  if(storageService.isLoggedIn()) {
    return true
  }

  return router.parseUrl('/login')
};
