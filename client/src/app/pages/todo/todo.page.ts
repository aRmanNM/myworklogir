import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";
import { IonModule } from "src/app/Shared/ion.module";
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

      <div id="container">
        <ion-list inset="true">
          <ion-item *ngFor="let todo of todoDetails">
            <ion-checkbox checked="{{ todo.isCompleted }}"></ion-checkbox>
            <ion-label dir="auto">{{ todo.title }}</ion-label>
          </ion-item>
        </ion-list>
      </div>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button (click)="openModal()">
          <ion-icon name="add-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [
    `
      ion-menu-button {
        color: var(--ion-color-primary);
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

      #container ion-label {
        margin-right: 16px;
      }
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

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: TodoModalComponent,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == "create") {
      this.todoService.create(data).subscribe((res) => {
        this.getAll();
      });
    }
  }
}
