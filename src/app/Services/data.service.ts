import { Injectable } from '@angular/core';
import {Entry} from "../Common/entry";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  getAllEntries = (): Promise<Array<Entry>> => {
    return new Promise((resolve, reject) => {
      this.angularFireDatabase.list('Entry').valueChanges().subscribe(data => {
        if (data) {
          return resolve(<Array<Entry>>data);
        }else {
          return reject('No data found');
        }
      });
    });
  }

  getLoggedInUserData = () => {
    const encryptedData: string = <string>localStorage.getItem('AUTH_FMV');
    const bytes  = CryptoJS.AES.decrypt(encryptedData, 'secret key 123');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  deleteEntry = (id: string) => {
    return this.angularFireDatabase.object(`Entry/${id}`).remove();
  }
}
