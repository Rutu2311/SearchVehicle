import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/compat/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {IUserDetails} from "../../Common/signIn";
// @ts-ignore
import * as CryptoJS from 'crypto-js';
import {user} from "@angular/fire/auth";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  loggedInUserData: any;
  auth = getAuth();


  constructor(private authService: AuthService, private toasterService: ToastrService, private router: Router, private db: AngularFireDatabase) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    // const itemsRef: AngularFireList<any> = db.list('Entry'); //.object to get single data
    // itemsRef.valueChanges().subscribe(data => {
    //   console.log('Data: ', data);
    // })
    // const add = db.list('Users').set('test-data', {
    //   name: 'RUTIK'
    // })
    // console.log('add: ', add);
  }

  test = async () => {

  }

  ngOnInit(): void {
  }

  login = async () => {
    try{
      const res = await this.authService.login(this.loginForm.value.email,this.loginForm.value.password);
      const userDetails: IUserDetails = await new Promise((resolve, reject)=>{
        try {
          this.db.object(`Users/${res.user?.uid}`).valueChanges().subscribe(data => {
            return resolve(<IUserDetails>data);
          });
        } catch (e) {
          reject(e);
        }
      });
      //DATA Encryption
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userDetails), 'secret key 123').toString();
      // const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userDetails), 'THISISASECRETKEY').toString();
      // console.log('encryptedData: ', encryptedData);
      // let bytes = CryptoJS.AES.decrypt(encryptedData, 'THISISASECRETKEY').toString();
      // // @ts-ignore
      // let originalData =  JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // console.log('originalData: ', originalData);
      localStorage.setItem('AUTH_FMV', encryptedData);
      this.toasterService.success('Login');

      this.router.navigate(['/dashboard']);
      // const user = await this.db.list('Entry').snapshotChanges().toPromise();

    } catch (e) {
      // @ts-ignore
      this.toasterService.error(e.message);
    }
  }
}
