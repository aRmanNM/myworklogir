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
  selector: "app-dashboard",
  template: `
    <ion-app>
      <ion-split-pane contentId="main-content">
        <ion-menu contentId="main-content" type="overlay">
          <ion-content>
            <ion-list id="main-sections">
              <ion-list-header>نرم افزار فریلنسر</ion-list-header>
              <ion-note>دستیار مدیریت تسک و ورکلاگ</ion-note>

              <ion-menu-toggle
                auto-hide="false"
                *ngFor="let p of appPages; let i = index"
              >
                <ion-item
                  routerDirection="root"
                  [routerLink]="[p.url]"
                  lines="none"
                  detail="false"
                  routerLinkActive="selected"
                >
                  <ion-icon
                    aria-hidden="true"
                    slot="start"
                    [ios]="p.icon + '-outline'"
                    [md]="p.icon + '-sharp'"
                  ></ion-icon>
                  <ion-label>{{ p.title }}</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>

            <ion-list id="other-sections">
              <ion-item lines="none" (click)="logout()">
                <ion-icon
                  aria-hidden="true"
                  slot="start"
                  ios="exit-outline"
                  md="exit-sharp"
                ></ion-icon>
                <ion-label>خروج</ion-label>
              </ion-item>
            </ion-list>

            <ion-label id="app-version">نسخه 0.0.1</ion-label>
          </ion-content>
        </ion-menu>
        <ion-router-outlet
          id="main-content"
        ></ion-router-outlet>
      </ion-split-pane>
    </ion-app>
  `,
  styles: [
    `
      ion-menu ion-content {
        --background: var(
          --ion-item-background,
          var(--ion-background-color, #fff)
        );
      }

      ion-menu.md ion-content {
        --padding-start: 8px;
        --padding-end: 8px;
        --padding-top: 20px;
        --padding-bottom: 20px;
      }

      ion-menu.md ion-list {
        padding: 20px 0;
      }

      ion-menu.md ion-note {
        margin-bottom: 30px;
      }

      ion-menu.md ion-list-header,
      ion-menu.md ion-note {
        padding-right: 10px;
      }

      ion-menu.md ion-list#main-sections {
        border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
      }

      ion-menu.md ion-list#main-sections ion-list-header {
        font-size: 22px;
        font-weight: 600;

        min-height: 20px;
      }

      ion-menu.md ion-list#other-sections ion-list-header {
        font-size: 16px;
        margin-bottom: 18px;
        color: #757575;
        min-height: 26px;
      }

      ion-menu.md ion-item {
        --padding-start: 10px;
        --padding-end: 10px;
        border-radius: 4px;
      }

      ion-menu.md ion-item.selected {
        --background: rgba(var(--ion-color-primary-rgb), 0.14);
      }

      ion-menu.md ion-item.selected ion-icon {
        color: var(--ion-color-primary);
      }

      ion-menu.md ion-item ion-icon {
        color: #616e7e;
      }

      ion-menu.md ion-item ion-label {
        font-weight: 500;
      }

      ion-menu.ios ion-content {
        --padding-bottom: 20px;
      }

      ion-menu.ios ion-list {
        padding: 20px 0 0 0;
      }

      ion-menu.ios ion-note {
        line-height: 24px;
        margin-bottom: 20px;
      }

      ion-menu.ios ion-item {
        --padding-start: 16px;
        --padding-end: 16px;
        --min-height: 50px;
      }

      ion-menu.ios ion-item.selected ion-icon {
        color: var(--ion-color-primary);
      }

      ion-menu.ios ion-item ion-icon {
        font-size: 24px;
        color: #73849a;
      }

      ion-menu.ios ion-list#other-sections ion-list-header {
        margin-bottom: 8px;
      }

      ion-menu.ios ion-list-header,
      ion-menu.ios ion-note {
        padding-left: 16px;
        padding-right: 16px;
      }

      ion-menu.ios ion-note {
        margin-bottom: 8px;
      }

      ion-note {
        display: inline-block;
        font-size: 16px;

        color: var(--ion-color-medium-shade);
      }

      ion-item.selected {
        --color: var(--ion-color-primary);
      }

      #app-version {
        position: absolute;
        bottom: 0;
      }
    `,
  ],
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
export class DashboardComponent {
  public appPages = [
    { title: "تسک", url: "/dashboard/todo", icon: "list" },
    { title: "ورکلاگ", url: "/dashboard/worklog", icon: "timer" },
    { title: "روتین", url: "/dashboard/routine", icon: "repeat" },
    { title: "پروژه", url: "/dashboard/workplace", icon: "briefcase" },
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
    this.router.navigate(["/auth/login"]);
  }
}
