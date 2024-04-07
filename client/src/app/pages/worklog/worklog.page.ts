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
import {
  addOutline,
  ellipsisHorizontal,
  ellipsisVertical,
  stopwatchOutline,
  trashOutline,
} from "ionicons/icons";
import { ModalController } from "@ionic/angular/standalone";
import { TimerModalComponent } from "./timer.modal";
import { WorkLogModalComponent } from "./worklog.modal";
import { LoadingService } from "src/app/services/loading.service";
import { DurationPipe } from "src/app/pipes/duration.pipe";
import { PersianDatePipe } from "src/app/pipes/persian-date.pipe";
import { ConfirmService } from "src/app/services/confirm.service";

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
        <ion-buttons slot="primary">
          <ion-button id="worklog-overflow-click-trigger">
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
        <ion-accordion
          value="{{ worklog.id }}"
          *ngFor="let worklog of worklogDetails"
        >
          <ion-item slot="header">
            <ion-label dir="auto">
              <h3>{{ worklog.title }}</h3>
              <p>{{ worklog.duration | duration }}</p>
            </ion-label>
          </ion-item>
          <ion-item slot="content">
            <ion-label color="dark" dir="auto">
              <h3>{{ worklog.description || "بدون توضیح" }}</h3>
              <p>{{ worklog.workplaceName }}</p>
              <p dir="rtl">
                از {{ worklog.startedAt | persianDate }} تا
                {{ worklog.finishedAt | persianDate }}
              </p>
            </ion-label>
          </ion-item>
          <ion-item slot="content">
            <ion-buttons slot="end">
              <ion-button (click)="delete(worklog.id)" color="danger"
                >حذف</ion-button
              >
              <ion-button (click)="openModal(worklog)" strong="true"
                >ویرایش</ion-button
              >
            </ion-buttons>
          </ion-item>
        </ion-accordion>
      </ion-accordion-group>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button (click)="start()">
          <ion-icon name="stopwatch-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>

    <ion-popover
      trigger="worklog-overflow-click-trigger"
      triggerAction="click"
      dismissOnSelect="true"
    >
      <ng-template>
        <ion-content>
          <ion-list>
            <ion-item (click)="openModal()" lines="none">
              <ion-icon name="add-outline"></ion-icon>
              <ion-label class="ion-padding-start">افزودن سابقه</ion-label>
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
  imports: [IonModule, CommonModule, DurationPipe, PersianDatePipe],
  providers: [WorkLogService],
})
export class WorkLogPage implements OnInit {
  worklogDetails: WorkLogDetailModel[] = [];

  constructor(
    private worklogService: WorkLogService,
    private modalCtrl: ModalController,
    public loadingService: LoadingService,
    private confirmService: ConfirmService
  ) {
    addIcons({
      stopwatchOutline,
      addOutline,
      ellipsisVertical,
      ellipsisHorizontal,
      trashOutline,
    });
  }

  ngOnInit(): void {
    this.worklogService.worklogItems$.subscribe((res) => {
      this.worklogDetails = res;
    });

    this.worklogService.startedWorklog$.subscribe(
      (res: WorkLogDetailModel | any) => {
        if (res != null) {
          this.showTimerModal(res);
        }
      }
    );
  }

  start() {
    const startModel: WorkLogStartModel = {
      title: `-`,
    };

    this.worklogService.start(startModel);
  }

  async delete(id: number) {
    var confirmed = await this.confirmService.confirmDelete();
    if (confirmed) {
      this.worklogService.delete(id);
    }
  }

  async openModal(worklog?: WorkLogDetailModel) {
    const modal = await this.modalCtrl.create({
      component: WorkLogModalComponent,
      componentProps: {
        id: worklog?.id,
        title: worklog?.title,
        description: worklog?.description,
        workplaceId: worklog?.workplaceId,
        startedAt: worklog?.startedAt,
        finishedAt: worklog?.finishedAt,
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == "create") {
      this.worklogService.create(data);
    } else if (role == "update") {
      this.worklogService.update(data);
    }
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
      this.worklogService.finish(data);
    }
  }

  async handleRefresh(event: any) {
    await this.worklogService.getAll();
    event.target.complete();
  }

  async deleteAll() {
    var confirmed = await this.confirmService.confirmDelete();
    if (confirmed) {
      this.worklogService.deleteAll();
    }
  }
}
