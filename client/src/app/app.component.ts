import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import {
  listOutline,
  listSharp,
  timerOutline,
  timerSharp,
  settingsOutline,
  settingsSharp,
  repeatOutline,
  repeatSharp,
  briefcaseOutline,
  briefcaseSharp,
  exitOutline,
  exitSharp,
} from "ionicons/icons";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  public appPages = [
    { title: "تسک", url: "/page/todo", icon: "list" },
    { title: "ورکلاگ", url: "/page/worklog", icon: "timer" },
    { title: "روتین", url: "/page/routine", icon: "repeat" },
    { title: "پروژه", url: "/page/workplace", icon: "briefcase" },
  ];
  constructor(private router: Router) {
    addIcons({
      listOutline,
      listSharp,
      timerOutline,
      timerSharp,
      settingsOutline,
      settingsSharp,
      repeatOutline,
      repeatSharp,
      briefcaseOutline,
      briefcaseSharp,
      exitOutline,
      exitSharp,
    });
  }

  logout() {
    localStorage.removeItem("t");
    this.router.navigate(["/page/auth/login"]);
  }
}
