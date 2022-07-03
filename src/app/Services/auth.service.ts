import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {AngularFireDatabase} from "@angular/fire/compat/database";
// @ts-ignore
import * as firebase from "firebase/app"
///
// import { AngularFireAuth } from '@angular/fire/auth';
// import { Auth } from 'firebase';
// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = getAuth();

  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  login = (email: string, password: string) => {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signUp = async (userData: any) => {
      console.log('BEFORE: ',this.auth.currentUser);
    // const app = firebase.initializeApp({
    //   apiKey: "AIzaSyCPb0-5YNHODtFV7iUVIuViNK6iqMAT0vU",
    //   authDomain: "myvehicle-9b75e.firebaseapp.com",
    //   databaseURL: "https://myvehicle-9b75e-default-rtdb.firebaseio.com",
    //   projectId: "myvehicle-9b75e",
    //   storageBucket: "myvehicle-9b75e.appspot.com",
    //   messagingSenderId: "238451151894",
    //   appId: "1:238451151894:web:99fdd031cfb67246e51137",
    //   measurementId: "G-VJ75B5KJMT"
    // }, "secondary");
    // const result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password);
    // console.log('result: ', result);
    // console.log('AFTER: ',this.auth.currentUser);

    // const createData =  await this.angularFireAuth.createUserWithEmailAndPassword(userData.email, userData.password);
  }

  getCurrentLoggedInUser = () => {
    return new Promise(((resolve, reject) => {
      onAuthStateChanged(this.auth, (user)=>{
        if (user) {
          // https://firebase.google.com/docs/reference/js/firebase.User
         this.db.object(`Users/${user.uid}`).valueChanges().subscribe(data => resolve(data));
        } else {
          reject('User not found')
        }
      });
    }));
  }

  logout = () => {
   return this.angularFireAuth.signOut();
  }
}
