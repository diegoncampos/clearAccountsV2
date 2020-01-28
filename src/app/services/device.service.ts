import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Device } from '../models/device.model'

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private afs: AngularFirestore) { }

  newDevice(device: Device):any{
    return this.afs.collection('devices').add(device);
  }

  getDeviceByUser(userId: string) {
    const purchaseCollection = this.afs.collection<any>('devices', ref => ref.where('userId', '==', userId)).valueChanges({idField: 'deviceId'});
    return purchaseCollection;
  }

  getDeviceByToken(token: string) {
    const purchaseCollection = this.afs.collection<any>('devices', ref => ref.where('token', '==', token)).valueChanges({idField: 'deviceId'});
    return purchaseCollection;
  }
}
