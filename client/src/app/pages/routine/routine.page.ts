import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { IonModule } from "src/app/shared/ion.module";

@Component({
  selector: "app-routine-page",
  standalone: true,
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>روتین</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title>روتین</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong class="capitalize">این بخش هنوز پیاده سازی نشده است</strong>
      </div>
    </ion-content>
  `,
  styles: [
    `
      ion-menu-button {
        color: var(--ion-color-primary);
      }

      #container {
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      #container strong {
        font-size: 20px;
        line-height: 26px;
      }

      #container p {
        font-size: 16px;
        line-height: 22px;
        color: #8c8c8c;
        margin: 0;
      }

      #container a {
        text-decoration: none;
      }
    `,
  ],
  imports: [IonModule, CommonModule],
})
export class RoutinePagePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
