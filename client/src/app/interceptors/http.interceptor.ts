import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { tap } from "rxjs";
import { LoadingService } from "../services/loading.service";

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();

  return next(req).pipe(
    tap({
      next: (res) => {
        if (res instanceof HttpResponse) {
          loadingService.hide();
        }
      },
      error: (res) => {
        loadingService.hide();
      },
    })
  );
};
