import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service'
import { Purchase } from '../../models/purchase.model';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import html2canvas from 'html2canvas';
import { LocalStorageService } from '../../services/local-storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {

  public groupData: any;
  public purchases: Purchase[];
  private userInfo: any;
  public owe: number;
  public credit: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService,
    private socialSharing: SocialSharing,
    private localStorageService: LocalStorageService,
    private alertController: AlertController
    ) {
      this.route.queryParams.subscribe(params => {
        if (params && params.special) {
          this.groupData = JSON.parse(params.special);
        }
      });
      this.localStorageService.getItem("userInfo").then(userInfo => {
        this.userInfo = userInfo;
      })
    }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getGroupPurchases();
  }

  goToNewPurchase() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.groupData)
      }
    };
    this.router.navigate(['new-purchase'], navigationExtras);
  }

  getGroupPurchases() {
    this.purchaseService.getPurchasesByGroupId(this.groupData.id).subscribe((res: any) => {
      if (res) {
        this.purchases = res;
        this.getOweCredit();
      }
    });
  }

  // Share is not working... ToDo check!
  shareList() {
    html2canvas(document.querySelector("#capture")).then((canvas) => {
      let message = "CLEAR ACCOUNTS!! Event: ";
      this.socialSharing.shareViaWhatsApp(message, canvas.toDataURL(), null)
      .then(() => {
          console.log("shareViaWhatsApp: Success");
        }).catch(() => {
          console.error("shareViaWhatsApp: failed");
        });
    });
  }

  showDescription(item) {
    this.purchases.forEach(elem =>{
      if(item !== elem){
        elem.showDescription = false;
      }
    })
    item.showDescription = !item.showDescription;
  }

  getOweCredit() {
    this.owe = 0;
    this.credit = 0;
    this.purchases.forEach(purchase => {
      purchase.participants.forEach( participant => {
        if (participant.email === this.userInfo.userEmail && !participant.paid) {
          // console.log(participant.name, participant.owe)
          if (participant.owe < 0){
            this.owe = this.owe + participant.owe;
          }
          else if (participant.owe > 0) {
            this.credit = this.credit + participant.owe;
          }
        }
      })
    })
  }

  payPurchase(purchaseInfo: any) {
    this.purchases.forEach(purchase =>{
      if(purchaseInfo.purchaseId === purchase.purchaseId){
        purchase.participants.forEach(async participant =>{
          if(participant.email === this.userInfo.userEmail) {
            const alert = await this.alertController.create({
              header: 'Pay purchase?',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel'
                }, {
                  text: 'Pay',
                  handler: () => {
                    participant.paid = true;
                    this.purchaseService.updateUserPaid(purchaseInfo.purchaseId, purchaseInfo.participants).then(res => {
                      console.log("se actualizo los participants")
                    }) .catch(error => console.log(error))
                    this.getOweCredit();
                  }
                }
              ]
            });
            await alert.present();
          }
        })
      }
    })
  }

  canPay(purchaseInfo: any) {
    let participant = purchaseInfo.participants.find(x => x.email === this.userInfo.userEmail)
    return participant && !participant.paid && participant.owe < 0 ? true : false;
  }
}
