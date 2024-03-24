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
  {
    path: "page/worklog",
    loadComponent: () =>
      import("./pages/worklog/worklog.page").then((m) => m.WorkLogPage),
  },
  {
    path: "page/routine",
    loadComponent: () =>
      import("./pages/routine/routine.page").then((m) => m.RoutinePagePage),
  },
];
