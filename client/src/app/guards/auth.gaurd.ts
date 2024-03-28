import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export function authGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    if (localStorage.getItem("t") != null) {
      return true;
    }

    router.navigate(["/auth/login"]);
    return false;
  };
}
