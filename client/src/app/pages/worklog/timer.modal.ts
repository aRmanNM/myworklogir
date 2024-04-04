import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { stopOutline } from "ionicons/icons";
import { interval, timer } from "rxjs";
import { DurationPipe } from "src/app/pipes/duration.pipe";
import { PersianDatePipe } from "src/app/pipes/persian-date.pipe";
import { IonModule } from "src/app/shared/ion.module";

@Component({
  selector: "app-timer.modal",
  standalone: true,
  template: `
    <ion-header> </ion-header>
    <ion-content class="ion-padding">
      <div id="container">
        <strong class="capitalize">مشغول به کار ..</strong>
        <p style="margin-top: 20px;">{{ timerValue.toString() | duration }}</p>
      </div>
      <ion-fab slot="fixed" vertical="bottom" horizontal="center">
        <ion-fab-button (click)="finish()">
          <ion-icon name="stop-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [
    `
      #container {
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
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
    `,
  ],
  imports: [IonModule, CommonModule, PersianDatePipe, DurationPipe],
})
export class TimerModalComponent implements OnInit {
  id: number = null!;
  startedAt: string = null!;
  timerValue: number = 0;

  constructor(private modalCtrl: ModalController) {
    addIcons({ stopOutline });
  }

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.timerValue =
        new Date().getTime() - new Date(this.startedAt).getTime();
    });
  }

  finish() {
    this.modalCtrl.dismiss(this.id, "finish");
  }
}
