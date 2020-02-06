import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private afs: AngularFirestore) { }

  newGoup(group: any):any{
    return this.afs.collection('groups').add(group);
  }

  editGoup(id: string, group: any):any{
    return this.afs.collection('groups').doc(id).set(group);
  }

  getGoup(id) {
    return this.afs.collection('groups').doc(id).snapshotChanges();
  }

  getGroupsByEmail(name: string, email: string) {
    const usersCollection = this.afs.collection<any>('groups', ref => ref.where('participants', 'array-contains', {name : name, email : email}));
    return usersCollection.valueChanges({idField: 'groupId'});
  }

}
