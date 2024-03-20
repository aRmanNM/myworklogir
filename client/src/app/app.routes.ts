import { Routes } from "@angular/router";

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
  },
];
