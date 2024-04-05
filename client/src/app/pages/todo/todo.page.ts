import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { addIcons } from "ionicons";
import {
  addOutline,
  downloadOutline,
  ellipsisHorizontal,
  ellipsisVertical,
  trashOutline,
} from "ionicons/icons";
import { IonModule } from "src/app/shared/ion.module";
import { TodoDetailModel } from "src/app/contracts/todo";
import { TodoService } from "src/app/services/todo.service";
import { TodoModalComponent } from "./todo.modal";
import {
  ModalController,
} from "@ionic/angular/standalone";
import { LoadingService } from "src/app/services/loading.service";
import { ConfirmService } from "src/app/services/confirm.service";

@Component({
  selector: "app-todo-page",
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>تسک</ion-title>
        <ion-buttons slot="primary">
          <ion-button id="click-trigger">
            <ion-icon
              slot="icon-only"
              ios="ellipsis-horizontal"
              md="ellipsis-vertical"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-progress-bar
        type="indeterminate"
        *ngIf="loadingService.visibility | async"
      ></ion-progress-bar>
    </ion-header>
    <ion-content [fullscreen]="true" color="light">
      <ion-refresher slot="fixed" (ionRefresh)="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-accordion-group *ngIf="!(loadingService.visibility | async)">
        <ion-accordion value="{{ todo.id }}" *ngFor="let todo of todoDetails">
          <ion-item slot="header">
            <ion-checkbox
              (click)="toggle(todo.id, $event)"
              [checked]="todo.isCompleted"
            ></ion-checkbox>
            <ion-label dir="auto" class="ion-margin">{{
              todo.title
            }}</ion-label>
          </ion-item>
          <ion-item slot="content">
            <ion-label color="dark" dir="auto">
              <h3>{{ todo.description || "بدون توضیح" }}</h3>
              <p>{{ todo.workplaceName }}</p>
            </ion-label>
          </ion-item>
          <ion-item slot="content">
            <ion-buttons slot="end">
              <ion-button (click)="delete(todo.id)" color="danger"
                >حذف</ion-button
              >
              <ion-button (click)="openModal(todo)" strong="true"
                >ویرایش</ion-button
              >
            </ion-buttons>
          </ion-item>
        </ion-accordion>
      </ion-accordion-group>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button (click)="openModal()">
          <ion-icon name="add-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>

    <ion-popover trigger="click-trigger" triggerAction="click" dismissOnSelect="true">
      <ng-template>
        <ion-content>
          <ion-list>
            <ion-item (click)="exportExcel()" lines="none">
              <ion-icon name="download-outline"></ion-icon>
              <ion-label class="ion-padding-start">خروجی اکسل</ion-label>
            </ion-item>
            <ion-item (click)="deleteAll()" lines="none">
              <ion-icon name="trash-outline"></ion-icon>
              <ion-label class="ion-padding-start">حذف همه</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-popover>
  `,
  styles: [``],
  standalone: true,
  providers: [TodoService],
  imports: [IonModule, CommonModule, TodoModalComponent],
})
export class TodoPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  todoDetails: TodoDetailModel[] = [];

  constructor(
    private todoService: TodoService,
    private modalCtrl: ModalController,
    public loadingService: LoadingService,
    private confirmService: ConfirmService
  ) {
    addIcons({
      addOutline,
      ellipsisVertical,
      ellipsisHorizontal,
      downloadOutline,
      trashOutline,
    });
  }

  ionViewDidEnter() {
    this.getAll();
  }

  ngOnInit() {}

  getAll() {
    this.todoDetails = [];
    this.todoService.getAll().subscribe((res) => {
      this.todoDetails = res;
    });
  }

  async openModal(todo?: TodoDetailModel) {
    const modal = await this.modalCtrl.create({
      component: TodoModalComponent,
      componentProps: {
        id: todo?.id,
        title: todo?.title,
        description: todo?.description,
        workplaceId: todo?.workplaceId,
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == "create") {
      this.todoService.create(data).subscribe((res) => {
        this.getAll();
      });
    } else if (role == "update") {
      this.todoService.update(data).subscribe((res) => {
        this.getAll();
      });
    }
  }

  async delete(id: number) {
    var confirmed = await this.confirmService.confirmDelete();
    if (confirmed) {
      this.todoService.delete(id).subscribe((res) => {
        this.getAll();
      });
    }
  }

  async deleteAll() {
    var confirmed = await this.confirmService.confirmDelete();
    if (confirmed) {
      this.todoService.deleteAll().subscribe((res) => {
        this.getAll();
      });
    }
  }

  toggle(id: number, event: any) {
    event.stopPropagation();
    this.todoService.toggle(id).subscribe((res) => {
      this.getAll();
    });
  }

  async handleRefresh(event: any) {
    await this.getAll();
    event.target.complete();
  }

  exportExcel() {}
}
