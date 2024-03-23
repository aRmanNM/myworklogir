import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { addIcons } from "ionicons";
import {
  WorkLogDetailModel,
  WorkLogStartModel,
  WorkLogStatus,
} from "src/app/contracts/worklog";
import { WorkLogService } from "src/app/services/worklog.service";
import { IonModule } from "src/app/shared/ion.module";
import { stopwatchOutline, timerOutline } from "ionicons/icons";
import { ModalController } from "@ionic/angular/standalone";
import { TimerModalComponent } from "./timer.modal";
import { Observable } from "rxjs";

@Component({
  selector: "app-worklog-page",
  standalone: true,
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>ورکلاگ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" color="light">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ورکلاگ</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-list>
          <ion-accordion-group>
            <ion-accordion
              value="{{ worklog.id }}"
              *ngFor="let worklog of worklogDetails"
            >
              <ion-item slot="header">
                <ion-label dir="auto">{{ worklog.title }}</ion-label>
              </ion-item>
              <ion-item slot="content">
                <ion-label color="dark" dir="auto">{{
                  worklog.description || "بدون توضیح"
                }}</ion-label>
                <ion-label color="dark" dir="auto">{{
                  worklog.duration
                }}</ion-label>
              </ion-item>
              <ion-item slot="content">
                <ion-buttons slot="end">
                  <ion-button (click)="delete(worklog.id)" color="danger"
                    >حذف</ion-button
                  >
                  <!-- <ion-button (click)="openTimerModal(worklog)" strong="true"
                    >ویرایش</ion-button
                  > -->
                </ion-buttons>
              </ion-item>
            </ion-accordion>
          </ion-accordion-group>
        </ion-list>
      </div>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button (click)="start()">
          <ion-icon name="stopwatch-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [``],
  imports: [IonModule, CommonModule],
  providers: [WorkLogService],
})
export class WorkLogComponent implements OnInit {
  worklogDetails: WorkLogDetailModel[] = [];

  constructor(
    private worklogService: WorkLogService,
    private modalCtrl: ModalController
  ) {
    addIcons({ stopwatchOutline });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.worklogService.getAll().subscribe((res) => {
      this.worklogDetails = res;

      const startedWorklog = this.worklogDetails.find(
        (w) => w.status == WorkLogStatus.Started
      );

      if (startedWorklog != undefined) {
        this.showTimerModal(startedWorklog);
      }
    });
  }

  start() {
    const startModel: WorkLogStartModel = {
      title: `ورکلاگ جدید (بدون عنوان)`,
    };

    this.worklogService.start(startModel).subscribe(async (res) => {
      await this.showTimerModal(res);
    });
  }

  delete(id: number) {
    this.worklogService.delete(id).subscribe((res) => {
      this.getAll();
    });
  }

  async showTimerModal(worklog: WorkLogDetailModel) {
    const modal = await this.modalCtrl.create({
      component: TimerModalComponent,
      componentProps: {
        id: worklog.id,
        startedAt: worklog.startedAt,
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == "finish") {
      this.worklogService.finish(data).subscribe((res) => {
        this.getAll();
      });
    }
  }
}
