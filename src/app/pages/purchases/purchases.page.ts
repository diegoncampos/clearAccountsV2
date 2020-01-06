import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service'
import { Purchase } from '../../models/purchase.model';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {

  public groupData: any;
  public purchases: Purchase;
  public showDescription: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService
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

}
