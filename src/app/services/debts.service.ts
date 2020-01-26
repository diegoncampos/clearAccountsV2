import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebtsService {

  constructor(private afs: AngularFirestore) { }

  // getDebtsByEmail({ email, name }: { email: string; name: string; }) : Observable<any> {
  //   let data$ = new Subject();
  //   const purchases = [];
  //   const info = [];
  //   const usersCollection = this.afs.collection<any>('groups', ref => ref.where('participants', 'array-contains', {name : name, email : email})).valueChanges({idField: 'groupId'});
  //   usersCollection.subscribe(groups => {
  //     // console.log("Grupos: ",groups)
  //     groups.forEach(group => {
  //       const purchaseCollection = this.afs.collection<any>('purchases', ref => ref.where('groupId', '==', group.groupId)).valueChanges({idField: 'purchaseId'});
  //       purchaseCollection.subscribe((purchase: any) => {
  //         if (purchase.length != 0) {
  //           purchase.forEach((purch: any) => {
  //             // console.log("Purch", purch.participants)
  //             purch.participants.forEach(part => {
  //               // console.log("part", part)
  //               if (part.email == email) {
  //                 purchases.push({ groupName: group.name, purchases: purchase })
  //               }
  //             });
  //           });
  //           // data$.next(purchases);
  //         }
  //       })
  //     })
  //     data$.next(purchases);
  //   })
  //   return data$;
  // }

  getDebtsByEmail({ email, name }: { email: string; name: string; }) : Observable<any> {
    let data$ = new Subject();
    const purchases = [];
    const info = [];
    const usersCollection = this.afs.collection<any>('groups', ref => ref.where('participants', 'array-contains', {name : name, email : email})).valueChanges({idField: 'groupId'});
    usersCollection.subscribe(groups => {
      // console.log("Grupos: ",groups)
      groups.forEach(group => {
        const purchaseCollection = this.afs.collection<any>('purchases', ref => ref.where('groupId', '==', group.groupId)).valueChanges({idField: 'purchaseId'});
        purchaseCollection.subscribe((purchase: any) => {
          if (purchase.length != 0) {
              // console.log("Purch", purch.participants)
              purchases.push({ groupName: group.name, purchases: purchase })
            // data$.next(purchases);
          }
        })
      })
      data$.next(purchases);
    })
    return data$;
  }
}
