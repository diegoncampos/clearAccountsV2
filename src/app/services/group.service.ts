import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private authService:AuthService, private afs: AngularFirestore) { }

  newGoup(group: any):any{
    return this.afs.collection('groups').add(group);
  }

  getGoup(id) {
    return this.afs.collection('groups').doc(id).snapshotChanges();
  }

  getGroupsByEmail(name: string, email: string) {
    const usersCollection = this.afs.collection<any>('groups', ref => ref.where('participants', 'array-contains', {name : name, email : email}));
    return usersCollection.get();
  }

}
