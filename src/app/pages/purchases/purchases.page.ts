import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {

  public groupData: any;
  public purchases: any = [{name: "compra 1"}, {name: "compra 2"}, {name: "compra 3"}, {name: "compra 4"}, {name: "compra 5"}, {name: "compra 6"}, {name: "compra 7"}, {name: "compra 8"}, {name: "compra 9"}, {name: "compra 10"}];

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.route.queryParams.subscribe(params => {
        if (params && params.special) {
          this.groupData = JSON.parse(params.special);
          console.log("Traigo: ", this.groupData)
        }
      });
    }

  ngOnInit() {
  }

  goToNewPurchase() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.groupData)
      }
    };
    this.router.navigate(['new-purchase'], navigationExtras);
  }

}
