import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor( private toastController: ToastController ) { }

  async showMessage(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration ? duration : 3000,
      position: 'middle',
      // color: 'dark',
      cssClass:"toastCustomStyle",
      translucent: true,
      showCloseButton: true,
      closeButtonText: 'Ok',
      animated: true
    });
    toast.present();
  }
}
