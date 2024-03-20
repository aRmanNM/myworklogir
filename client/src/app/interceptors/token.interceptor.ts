import { HttpInterceptorFn } from "@angular/common/http";

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("t");
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
