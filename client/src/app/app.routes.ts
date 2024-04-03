import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.gaurd";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./dashboard.component").then((m) => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: "",
        redirectTo: "todo",
        pathMatch: "full",
      },
      {
        path: "todo",
        loadComponent: () =>
          import("./pages/todo/todo.page").then((m) => m.TodoPage),
      },
      {
        path: "worklog",
        loadComponent: () =>
          import("./pages/worklog/worklog.page").then((m) => m.WorkLogPage),
      },
      {
        path: "routine",
        loadComponent: () =>
          import("./pages/routine/routine.page").then((m) => m.RoutinePage),
      },
      {
        path: "workplace",
        loadComponent: () =>
          import("./pages/workplace/workplace.page").then(
            (m) => m.WorkplacePage
          ),
      },
    ],
  },
  {
    path: "auth/login",
    loadComponent: () =>
      import("./pages/auth/login.page").then((m) => m.LoginPage),
  },
  {
    path: "auth/register",
    loadComponent: () =>
      import("./pages/auth/register.page").then((m) => m.RegisterPage),
  },
];
