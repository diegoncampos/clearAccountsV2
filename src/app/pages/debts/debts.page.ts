import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { DebtsService } from '../../services/debts.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AlertController } from '@ionic/angular';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.page.html',
  styleUrls: ['./debts.page.scss'],
})
export class DebtsPage implements OnInit {

  public info: any = null;
  public userInfo: any;
  constructor(
    private debtsService: DebtsService,
    private localStorageService: LocalStorageService,
    private alertController: AlertController,
    private purchaseService: PurchaseService
    ) { }

  ngOnInit() {
    this.localStorageService.getItem("userInfo").then(userInfo => {
      this.userInfo = userInfo;
      this.updateInfo();
    })
  }

  updateInfo() {
    this.debtsService.getDebtsByEmail({ email: this.userInfo.userEmail, name: this.userInfo.userName }).subscribe(res => {
      if(res){
        this.info = res;
      }
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

  noDebtsMessage(info) {
    return info && info.length > 0? false : true;
  }

  async payPurchase(purchaseInfo: any) {
    const alert = await this.alertController.create({
      header: 'Pay ' + purchaseInfo.description + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Pay',
          handler: () => {
            let participant = purchaseInfo.participants.find(x => x.email === this.userInfo.userEmail)
            participant.paid = true;
            this.purchaseService.updateUserPaid(purchaseInfo.purchaseId, purchaseInfo.participants).then(res => {
              console.log("Pay updated")
              this.updateInfo();
            }) .catch(error => console.log(error))
          }
        }
      ]
    });
    await alert.present();
  }

  canPay(purchaseInfo: any) {
    let participant = purchaseInfo.participants.find(x => x.email === this.userInfo.userEmail)
    return !participant.paid && participant.owe < 0 ? true : false;
  }

}
