import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";
import { IonModule } from "src/app/shared/ion.module";
import { TodoDetailModel } from "src/app/contracts/todo";
import { TodoService } from "src/app/services/todo.service";
import { TodoModalComponent } from "./todo.modal";
import { ModalController } from "@ionic/angular/standalone";

@Component({
  selector: "app-todo-page",
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>تسکها</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" color="light">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">تسکها</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-accordion-group>
        <ion-accordion value="{{ todo.id }}" *ngFor="let todo of todoDetails">
          <ion-item slot="header">
            <!-- <ion-checkbox
                  (ionChange)="toggle(todo.id)"
                  checked="{{ todo.isCompleted }}"
                ></ion-checkbox> -->
            <ion-label dir="auto">{{ todo.title }}</ion-label>
          </ion-item>
          <ion-item slot="content">
            <ion-label color="dark" dir="auto">{{
              todo.description || "بدون توضیح"
            }}</ion-label>
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
  `,
  styles: [
    `
      #container {
      }

      // #container ion-label {
      //   margin-right: 16px;
      // }
    `,
  ],
  standalone: true,
  providers: [TodoService],
  imports: [IonModule, CommonModule, TodoModalComponent],
})
export class TodoPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  todoDetails: TodoDetailModel[] = [];

  constructor(
    private todoService: TodoService,
    private modalCtrl: ModalController
  ) {
    addIcons({ addOutline });
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
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
        workplaceId: todo?.workplaceId
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

  delete(id: number) {
    this.todoService.delete(id).subscribe((res) => {
      this.getAll();
    });
  }

  toggle(id: number) {
    this.todoService.toggle(id).subscribe((res) => {
      this.getAll();
    });
  }
}
