import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { DebtsService } from '../../services/debts.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.page.html',
  styleUrls: ['./debts.page.scss'],
})
export class DebtsPage implements OnInit {

  public info: any;
  public userInfo: any;
  constructor(
    private debtsService: DebtsService,
    private localStorageService: LocalStorageService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.localStorageService.getItem("userInfo").then(userInfo => {
      this.userInfo = userInfo;
      this.debtsService.getDebtsByEmail({ email: this.userInfo.userEmail, name: this.userInfo.userName }).subscribe(res => {
        this.info = res;
      })
    })
  }

  ngAfterViewChecked(){
    this.cleanInfo(this.info)
  }

  cleanInfo(info: any) {
    if (info) {
      info.forEach((element, index) => {
        element.purchases.forEach(purchases => {
          if(!purchases.participants.find( parti => parti.email === this.userInfo.userEmail )){
            info.splice(index, 1);
          }
        });
      });
    }
  }

  showPurchases(groups: any) {
    groups.showPurchases = !groups.showPurchases;
  }

  findOwe(purchase: any) {
    let ret: number = 0;
    purchase.participants.forEach(elem => {
      if(elem.email === this.userInfo.userEmail) {
        ret = elem.owe;
      }
    });
    return ret;
  }

  async payPurchase(purchaseInfo: any) {
    // this.userInfo.purchases.forEach(purchase =>{
    //   if(purchaseInfo.purchaseId === purchase.purchaseId){
    //     purchase.participants.forEach(async participant =>{
    //       if(participant.email === this.userInfo.userEmail) {
    //         const alert = await this.alertController.create({
    //           header: 'Pay purchase?',
    //           buttons: [
    //             {
    //               text: 'Cancel',
    //               role: 'cancel'
    //             }, {
    //               text: 'Pay',
    //               handler: () => {
    //                 participant.paid = true;
    //                 // this.getOweCredit();
    //                 console.log("Pago", participant)
    //               }
    //             }
    //           ]
    //         });
    //         await alert.present();
    //       }
    //     })
    //   }
    // })

    console.log("purchaseId", purchaseInfo)
    const alert = await this.alertController.create({
      header: 'Pay ' + purchaseInfo.description + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Pay',
          handler: () => {
            purchaseInfo.paid = true;
            // this.getOweCredit();
            console.log("Pago", purchaseInfo)
          }
        }
      ]
    });
    await alert.present();
  }

}
