import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Entry, FilterObj} from "../../Common/entry";
import * as CryptoJS from "crypto-js";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DataService} from "../../Services/data.service";
import {ToastrService} from "ngx-toastr";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public data: any;
  // @ts-ignore
  public entries: Array<Entry>;
  public userDetails: any;
  modalRef?: BsModalRef;
  public imgUrl1: any;
  public imgUrl2: any = '';
  public vNumber: any;
  public filterObj: FilterObj = {
    noOfRecords: 10,
    vehicleNumber: '',
    selectedRegions: '',
    date: ''
  }


  constructor(private authService: AuthService, private db: AngularFireDatabase,
              private modalService: BsModalService, private dataService: DataService,
              private toasterService: ToastrService, private ngxUiLoaderService: NgxUiLoaderService) {
    this.userDetails = this.dataService.getLoggedInUserData();
  }

  async ngOnInit(): Promise<void> {
    this.ngxUiLoaderService.startLoader("loader-01");
    this.entries = await this.dataService.getAllEntries();
    this.ngxUiLoaderService.stopLoader("loader-01");
    // this.ngxUiLoaderService.stop();
    // this.db.list('Entry', ref => ref.orderByChild('location').equalTo('hirabag').orderByChild('num').equalTo('MH12DE1433')).valueChanges().subscribe(data => {
    //   console.log('TEN DATA');
    //   console.log(data);
    // })
    // console.log(this.entries.length);
  }

  showImages = async (template: TemplateRef<any>, entry: any) => {
    this.ngxUiLoaderService.startLoader('loader-01');
    this.imgUrl1 = entry?.imgUrl;
    this.imgUrl2 = entry?.img2Url;
    this.vNumber = entry.num;
    this.modalRef = this.modalService.show(template, entry)
    // const deleteData = await this.db.object('Entry/1654590401595_n1zUX1NO1jcgFvdkghjdbylCDct2').remove();
    // console.log(deleteData);
    // this.db.object('Entry/1655265701071_gLXObifJHEUxLVya1ftm0AwznrA2').
  }

  deleteEntry = async (id: string | undefined, index: number) => {
    try {
      this.ngxUiLoaderService.startLoader("loader-01");
      await this.dataService.deleteEntry(<string>id);
      this.entries.splice(index, 1);
      this.toasterService.success("Entry deleted successfully");
      this.ngxUiLoaderService.stopLoader("loader-01");
    }catch (e){
      // @ts-ignore
      this.toasterService.error(e.message);
    }
  }

  filteredEntries = () => {
    const final: any = [];
    const values = Object.values(this.filterObj);
    values.forEach((value => {
      final.push(value ? true : false);
    }));
    final.shift();
    let noOfFilters: number = 0;
    final.forEach((value: any) => {
      value ? noOfFilters++ : noOfFilters;
    });
    if (noOfFilters === 1) {
      for (const key in this.filterObj) {
        // @ts-ignore
        if (key !== 'noOfRecords' && !this.filterObj[key]) {
          // @ts-ignore
          console.log(key, ' obj: ', this.filterObj)
        }
      }
    }
  }

  imageLoaded = () => {
    this.ngxUiLoaderService.stopLoader('loader-01');
  }

}
