import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service'

import { LocalStorageService } from '../../services/local-storage.service';
import { Purchase } from '../../models/purchase.model';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.page.html',
  styleUrls: ['./new-purchase.page.scss'],
})
export class NewPurchasePage implements OnInit {

  public newPurchease: any = {description:"", spent: null, paidBy: "", participants: []};
  public groupData: any;
  public payBy: any = {userName: "User"};
  public fixedParticipants: any = [];
  public allParticipants: boolean = true;
  public guests: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private purchaseService: PurchaseService,
    private notificationsService: NotificationsService
    ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.groupData = JSON.parse(params.special);
        this.fixedParticipants = this.groupData.participants;
        console.log("GroupData: ", this.groupData)
        // Is checked true for all participants
        this.fixedParticipants.forEach(element => {
          element.isChecked = true;
        });
        // this.fixParticipants(this.groupData.participants);
      }
    });
    this.localStorageService.getItem("userInfo").then(info => {
      // console.log("User info: ", info);
      this.payBy = info;
    })
  }

  ngOnInit() {
  }

  // This function remove the current user from the group participants list
  // async fixParticipants(participants) {
  //   await this.localStorageService.getObject('userInfo').then(result => {
  //     participants.forEach((element, i) => {
  //       if (element.name === 'Diego') {
  //         participants.splice(i, 1);
  //       }
  //     });
  //     this.fixedParticipants = participants;
  //   });
  // }

  save() {
    let participants = this.getParticipants(this.fixedParticipants);
    let purchase: Purchase = {
      groupId: this.groupData.id,
      date: new Date().toString(),
      participants: this.payDivider(participants),
      description: this.newPurchease.description,
      spent: this.newPurchease.spent
    }
    this.purchaseService.newPurchase(purchase).then(res => {
      this.notificationsService.showMessage("Purchase saved!");
      this.router.navigate(['/purchases']);
    }, err => { this.notificationsService.showMessage("Fail saving Purchase, " + err) });
  }

  getParticipants(participants: any) {
    let part = JSON.parse(JSON.stringify(participants));
    part.forEach((element, index, object) => {
      if (!element.isChecked) {
        object.splice(index, 1);
      }
    });
    part.forEach((element) => {
      delete element.isChecked;
    });
    // Add guests list to participants list
    this.guests.forEach((element) => {
      part.push({name: element, email: "Guest"})
    });
    return part;
  }

  payDivider(participants: any[]) {
    let eo = this.newPurchease.spent / participants.length;
    participants.forEach(element => {
      element.owe = eo;
    })
    return participants;
  }

  addGuest(guest: any) {
    if(guest.value !== "") {
      this.guests.push(guest.value);
      guest.value = "";
    }
  }

}
