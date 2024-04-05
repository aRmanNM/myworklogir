import { Injectable } from "@angular/core";
import { ActionSheetController } from "@ionic/angular/standalone";

@Injectable({
  providedIn: "root",
})
export class ConfirmService {
  constructor(private actionSheetCtrl: ActionSheetController) {}

  async confirmDelete(): Promise<boolean> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "آیا اطمینان دارید ؟",
      buttons: [
        {
          text: "بله",
          role: "confirm",
        },
        {
          text: "خیر",
          role: "cancel",
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === "confirm";
  }
}
