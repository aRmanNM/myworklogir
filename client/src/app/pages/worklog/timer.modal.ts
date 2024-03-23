import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { stopOutline } from "ionicons/icons";
import { IonModule } from "src/app/shared/ion.module";

@Component({
  selector: "app-timer.modal",
  standalone: true,
  template: `
    <ion-header> </ion-header>
    <ion-content class="ion-padding">
      <ion-label>مشغول به کار ...</ion-label>
      <ion-label>{{ id }}</ion-label>
      <ion-label>{{ startedAt }}</ion-label>
      <ion-fab slot="fixed" vertical="bottom" horizontal="center">
        <ion-fab-button (click)="finish()">
          <ion-icon name="stop-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [``],
  imports: [IonModule, CommonModule],
})
export class TimerModalComponent implements OnInit {
  id: number = null!;
  startedAt: string = null!;

  constructor(private modalCtrl: ModalController) {
    addIcons({ stopOutline });
  }

  ngOnInit(): void {}

  finish() {
    this.modalCtrl.dismiss(this.id, "finish");
  }
}
