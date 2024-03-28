import { Component, OnInit } from "@angular/core";
import { IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  selector: "app-root",
  standalone: true,
  template: ` <ion-router-outlet></ion-router-outlet> `,
  styles: [``],
  imports: [IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
