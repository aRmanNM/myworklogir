import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { WorkplaceDetailModel } from "src/app/contracts/workplace";
import { WorkplaceService } from "src/app/services/workplace.service";
import { IonModule } from "src/app/shared/ion.module";
import { WorkplaceModalComponent } from "./workplace.modal";
import { addOutline } from "ionicons/icons";
import { CommonModule } from "@angular/common";
import { LoadingService } from "src/app/services/loading.service";

@Component({
  selector: "app-workplace-page",
  standalone: true,
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>پروژه</ion-title>
      </ion-toolbar>
      <ion-progress-bar
        type="indeterminate"
        *ngIf="loadingService.visibility | async"
      ></ion-progress-bar>
    </ion-header>

    <ion-content
      [fullscreen]="true"
      color="light"
      *ngIf="!(loadingService.visibility | async)"
    >
      <ion-refresher slot="fixed" (ionRefresh)="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-accordion-group>
        <ion-accordion
          value="{{ workplace.id }}"
          *ngFor="let workplace of workplaceDetails"
        >
          <ion-item slot="header">
            <ion-label dir="auto">{{ workplace.name }}</ion-label>
          </ion-item>
          <ion-item slot="content">
            <ion-buttons slot="end">
              <ion-button (click)="delete(workplace.id)" color="danger"
                >حذف</ion-button
              >
              <ion-button (click)="openModal(workplace)" strong="true"
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
  styles: [``],
  imports: [IonModule, CommonModule],
})
export class WorkplacePage implements OnInit {
  workplaceDetails: WorkplaceDetailModel[] = [];

  constructor(
    private workplaceService: WorkplaceService,
    private modalCtrl: ModalController,
    public loadingService: LoadingService
  ) {
    addIcons({ addOutline });
  }

  ngOnInit(): void {
    this.workplaceService.workplaceDetails$.subscribe((res) => {
      this.workplaceDetails = res;
    });
  }

  async openModal(workplace?: WorkplaceDetailModel) {
    const modal = await this.modalCtrl.create({
      component: WorkplaceModalComponent,
      componentProps: {
        id: workplace?.id,
        name: workplace?.name,
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == "create") {
      this.workplaceService.create(data);
    } else if (role == "update") {
      this.workplaceService.update(data);
    }
  }

  delete(id: number) {
    this.workplaceService.delete(id);
  }

  async handleRefresh(event: any) {
    await this.workplaceService.getAll();
    event.target.complete();
  }
}
