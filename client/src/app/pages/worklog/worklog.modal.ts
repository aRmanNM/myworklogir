import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ModalController } from "@ionic/angular/standalone";
import {
  WorkLogCreateModel,
  WorkLogUpdateModel,
} from "src/app/contracts/worklog";
import { WorkplaceDetailModel } from "src/app/contracts/workplace";
import { WorkplaceService } from "src/app/services/workplace.service";
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
      <ion-input
        label="عنوان:"
        labelPlacement="stacked"
        type="text"
        placeholder="ورکلاگ فیچر جدید"
        [(ngModel)]="title"
      ></ion-input>
      <ion-textarea
        label="توضیحات:"
        labelPlacement="stacked"
        type="text"
        rows="5"
        [(ngModel)]="description"
      ></ion-textarea>
      <ion-select
        [(ngModel)]="workplaceId"
        interface="action-sheet"
        placeholder="انتخاب پروژه"
        cancelText="انصراف"
      >
        <ion-select-option [value]="null">-</ion-select-option>
        <ion-select-option
          *ngFor="let workplace of workplaces"
          [value]="workplace.id"
          >{{ workplace.name }}</ion-select-option
        >
      </ion-select>
    </ion-content>
  `,
  styles: [``],
  imports: [IonModule, CommonModule, FormsModule],
})
export class WorkLogModalComponent implements OnInit {
  id?: number;
  title: string = "";
  description: string = "";
  startedAt: string = "";
  finishedAt: string = "";
  workplaceId?: number;

  workplaces: WorkplaceDetailModel[] = [];

  constructor(
    private modalCtrl: ModalController,
    private workplaceService: WorkplaceService
  ) {}

  ngOnInit(): void {
    this.getWorkplaces();
  }

  getWorkplaces() {
    this.workplaceService.getAll().subscribe((res) => {
      this.workplaces = res;
    });
  }

  create() {
    const data: WorkLogCreateModel = {
      title: this.title,
      description: this.description,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
      workplaceId: this.workplaceId ?? null,
    };

    return this.modalCtrl.dismiss(data, "create");
  }

  update() {
    const data: WorkLogUpdateModel = {
      id: this.id!,
      title: this.title,
      description: this.description,
      workplaceId: this.workplaceId ?? null,
    };

    return this.modalCtrl.dismiss(data, "update");
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }
}
