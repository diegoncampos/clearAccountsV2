import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  async setObject(key:string, objectValue:any) {
    await Storage.set({
      key: key,
      value: JSON.stringify(objectValue)
    });
  }

  async getObject(key:string) {
    const ret = await Storage.get({ key: key });
    return JSON.parse(ret.value);
  }

  async setItem(key:string, value:string) {
    await Storage.set({
      key: key,
      value: value
    });
  }

  async getItem(key:string) {
    const { value } = await Storage.get({ key: key });
    console.log('Got item: ', value);
    return value;
  }

  async removeItem(key:string) {
    await Storage.remove({ key: key });
  }

  async keys() {
    const { keys } = await Storage.keys();
    console.log('Got keys: ', keys);
  }

  async clear() {
    await Storage.clear();
  }
}
