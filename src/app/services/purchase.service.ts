import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  newPurchase(purchase: any):any{
    return this.afs.collection('purchases').add(purchase);
  }

  //idField add the collection id to response
  getPurchasesByGroupId(groupId: string) {
    const purchaseCollection = this.afs.collection<any>('purchases', ref => ref.where('groupId', '==', groupId)).valueChanges({idField: 'purchaseId'});
    return purchaseCollection;
  }

  updateUserPaid(purchaseId: string, _participants: any[]){
    const purchaseCollection = this.afs.collection<any>('purchases').doc(purchaseId).update({participants: _participants});
    return purchaseCollection;
  }

  getPurchasesByEmail(_email: string) {
    return this.http.get(environment.firebaseFunctions.getPurchasesByEmail + _email)
  }

}
