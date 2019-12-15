import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.page.html',
  styleUrls: ['./new-purchase.page.scss'],
})
export class NewPurchasePage implements OnInit {

  public newPurchease: any = {description:"", spent: 0, paidBy: "", participants: []};
  public groupData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.groupData = JSON.parse(params.special);
        console.log("New purchese recive: ", this.groupData)
      }
    });
  }

  ngOnInit() {
  }

}
