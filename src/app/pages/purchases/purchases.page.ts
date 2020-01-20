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

  payPurchase(purchaseInfo: any) {
    // console.log("Pago!", this.userInfo, purchaseInfo)
    this.purchases.forEach(purchase =>{
      if(purchaseInfo.purchaseId === purchase.purchaseId){
        // console.log("Econstre", elem)
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
                    console.log("Encontrado", participant,purchase)
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

}
