import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from "@ionic/angular/standalone";

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
  ],
})
export class TodoPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {}
}
