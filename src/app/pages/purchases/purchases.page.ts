import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service'
import { Purchase } from '../../models/purchase.model';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {

  public groupData: any;
  public purchases: Purchase[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService,
    private socialSharing: SocialSharing
    ) {
      this.route.queryParams.subscribe(params => {
        if (params && params.special) {
          this.groupData = JSON.parse(params.special);
        }
      });
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
      elem.showDescription = false;
    })
    item.showDescription = !item.showDescription;
  }

}
