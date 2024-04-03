import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ModalController } from "@ionic/angular/standalone";
import {
  WorkplaceCreateModel,
  WorkplaceUpdateModel,
} from "src/app/contracts/workplace";
import { LoadingService } from "src/app/services/loading.service";
import { IonModule } from "src/app/shared/ion.module";

@Component({
  selector: "app-workplace-modal",
  standalone: true,
  imports: [IonModule, FormsModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="cancel()">انصراف</ion-button>
        </ion-buttons>
        <ion-buttons slot="end" *ngIf="id == null">
          <ion-button (click)="create()" [strong]="true">افزودن</ion-button>
        </ion-buttons>
        <ion-buttons slot="end" *ngIf="id != null">
          <ion-button (click)="update()" [strong]="true">ویرایش</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content
      class="ion-padding"
      *ngIf="!(loadingService.visibility | async)"
    >
      <ion-item>
        <ion-input
          label="نام:"
          labelPlacement="stacked"
          type="text"
          placeholder="عنوان پروژه یا شرکت"
          [(ngModel)]="name"
        ></ion-input>
      </ion-item>
    </ion-content>
  `,
  styles: [``],
})
export class WorkplaceModalComponent implements OnInit {
  id?: number;
  name: string = "";

  constructor(
    private modalCtrl: ModalController,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  create() {
    const data: WorkplaceCreateModel = {
      name: this.name,
    };

    return this.modalCtrl.dismiss(data, "create");
  }

  update() {
    const data: WorkplaceUpdateModel = {
      id: this.id!,
      name: this.name,
    };

    return this.modalCtrl.dismiss(data, "update");
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }
}
