import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ModalController } from "@ionic/angular/standalone";
import { IonModule } from "src/app/Shared/ion.module";
import { TodoCreateModel } from "src/app/contracts/todo";

@Component({
  selector: "app-todo-modal",
  standalone: true,
  imports: [IonModule, FormsModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="cancel()">انصراف</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button (click)="create()" [strong]="true">افزودن</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          label="عنوان:"
          labelPlacement="stacked"
          type="text"
          placeholder="توسعه فیچر جدید"
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
})
export class TodoModalComponent implements OnInit {
  title: string = "";
  description: string = "";

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {}

  create() {
    const todoCreateModel: TodoCreateModel = {
      title: this.title,
      description: this.description,
    };

    return this.modalCtrl.dismiss(todoCreateModel, 'create');
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }
}
