import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ModalController } from "@ionic/angular/standalone";
import { WorkLogCreateModel, WorkLogUpdateModel } from "src/app/contracts/worklog";
import { IonModule } from "src/app/shared/ion.module";

@Component({
  selector: "app-worklog-modal",
  standalone: true,
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
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          label="عنوان:"
          labelPlacement="stacked"
          type="text"
          placeholder="ورکلاگ فیچر جدید"
          [(ngModel)]="title"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-textarea
          label="توضیحات:"
          labelPlacement="stacked"
          type="text"
          rows="5"
          [(ngModel)]="description"
        ></ion-textarea>
      </ion-item>
    </ion-content>
  `,
  styles: [``],
  imports: [IonModule, CommonModule, FormsModule],
})
export class WorkLogModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  id?: number;
  title: string = "";
  description: string = "";
  startedAt: string = "";
  finishedAt: string = "";

  ngOnInit(): void {}

  create() {
    const data: WorkLogCreateModel = {
      title: this.title,
      description: this.description,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
    };

    return this.modalCtrl.dismiss(data, "create");
  }

  update() {
    const data: WorkLogUpdateModel = {
      id: this.id!,
      title: this.title,
      description: this.description,
    };

    return this.modalCtrl.dismiss(data, "update");
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }
}
