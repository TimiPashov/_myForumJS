import { CanActivateFn } from '@angular/router';

export const isNotLoggedInGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
