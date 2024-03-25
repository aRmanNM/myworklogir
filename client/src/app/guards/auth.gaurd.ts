import { CanActivateFn } from "@angular/router";

export function authGuard(): CanActivateFn {
  return () => {
    if (localStorage.getItem("t") != null) {
      return true;
    }

    return false;
  };
}
