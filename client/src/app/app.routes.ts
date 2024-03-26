import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.gaurd";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "page/todo",
    pathMatch: "full",
  },
  {
    path: "page/todo",
    loadComponent: () =>
      import("./pages/todo/todo.page").then((m) => m.TodoPage),
    canActivate: [authGuard],
  },
  {
    path: "page/worklog",
    loadComponent: () =>
      import("./pages/worklog/worklog.page").then((m) => m.WorkLogPage),
    canActivate: [authGuard],
  },
  {
    path: "page/routine",
    loadComponent: () =>
      import("./pages/routine/routine.page").then((m) => m.RoutinePage),
    canActivate: [authGuard],
  },
  {
    path: "page/workplace",
    loadComponent: () =>
      import("./pages/workplace/workplace.page").then((m) => m.WorkplacePage),
    canActivate: [authGuard],
  },
  {
    path: "page/auth/login",
    loadComponent: () =>
      import("./pages/auth/login.page").then((m) => m.LoginPage),
  },
  {
    path: "page/auth/register",
    loadComponent: () =>
      import("./pages/auth/register.page").then((m) => m.RegisterPage),
  },
];
