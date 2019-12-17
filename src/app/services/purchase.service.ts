import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private afs: AngularFirestore) { }

  newPurchase(purchase: any):any{
    return this.afs.collection('purchases').add(purchase);
  }

  getPurchasesByGroupId(groupId: string) {
    const purchaseCollection = this.afs.collection<any>('purchases', ref => ref.where('groupId', '==', groupId)).valueChanges();
    return purchaseCollection;
  }

}
