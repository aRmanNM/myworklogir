import { enableProdMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouteReuseStrategy, provideRouter } from "@angular/router";
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from "@ionic/angular/standalone";

import { environment } from "./environments/environment";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { TokenInterceptor } from "./app/interceptors/token.interceptor";
import { HttpInterceptor } from "./app/interceptors/http.interceptor";
import { routes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([TokenInterceptor, HttpInterceptor])),
  ],
});
