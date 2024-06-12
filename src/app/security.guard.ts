import { CanActivateFn, Router } from '@angular/router';
import { BookService } from './book-list/book.service';
import { inject } from '@angular/core';

export const securityGuard: CanActivateFn = (next, state) => {
  const authService = inject(BookService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
