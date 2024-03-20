import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonCheckbox,
} from "@ionic/angular/standalone";
import { TodoDetailModel } from "src/app/contracts/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-todo-page",
  templateUrl: "./todo.page.html",
  styleUrls: ["./todo.page.scss"],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    CommonModule
  ],
  providers: [
    TodoService
  ]
})
export class TodoPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  todoDetails: TodoDetailModel[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.todoService.getAll().subscribe(res => {
      this.todoDetails = res;
    })
  }
}
