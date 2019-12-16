import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from '../../services/local-storage.service'

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.page.html',
  styleUrls: ['./new-purchase.page.scss'],
})
export class NewPurchasePage implements OnInit {

  public newPurchease: any = {description:"", spent: 0, paidBy: "", participants: []};
  public groupData: any;
  public fixedParticipants: any = [];
  public allParticipants: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
    ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.groupData = JSON.parse(params.special);
        this.fixedParticipants = this.groupData.participants;
        this.fixedParticipants.forEach(element => {
          element.isChecked = true;
        });
        // this.fixParticipants(this.groupData.participants);
      }
    });
  }

  ngOnInit() {
  }

  // This function remove the current user from the group participants list
  async fixParticipants(participants) {
    await this.localStorageService.getObject('userInfo').then(result => {
      participants.forEach((element, i) => {
        if (element.name === 'Diego') {
          participants.splice(i, 1);
        }
      });
      this.fixedParticipants = participants;
    });
  }

  save() {
    console.log("Guardo: ", this.fixedParticipants)
  }

}
