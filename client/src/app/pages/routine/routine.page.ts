import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/services/loading.service";
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
        <ion-progress-bar
          type="indeterminate"
          *ngIf="loadingService.visibility | async"
        ></ion-progress-bar>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div id="container">این بخش هنوز پیاده سازی نشده است</div>
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
    `,
  ],
  imports: [IonModule, CommonModule],
})
export class RoutinePage implements OnInit {
  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {}
}
