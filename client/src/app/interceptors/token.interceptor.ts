import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.toUpperCase().includes("CONNECT/TOKEN")) {
    return next(req);
  }

  const router = inject(Router);
  const token = localStorage.getItem("t");

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    tap({
      error: (res) => {
        if (res.status == 401) {
          router.navigate(["page/auth/login"]);
        }
      },
    })
  );
};
