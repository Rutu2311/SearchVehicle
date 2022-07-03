import { Component, OnInit } from '@angular/core';
import {DataService} from "../../Services/data.service";
import {Entry} from "../../Common/entry";
import {MONTHS, YEARS, REGIONS} from "../../Common/constant";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  readonly MONTHS = MONTHS;
  readonly YEARS = YEARS;
  readonly REGIONS = REGIONS;

  public userDetails: any;
  public entries: Array<Entry> | undefined;
  public monthlyEntries: any = [];
  public currentYear: number = 2020;
  public yearlyData: any = {
    '01': 0,
    '02': 0,
    '03': 0,
    '04': 0,
    '05': 0,
    '06': 0,
    '07': 0,
    '08': 0,
    '09': 0,
    '10': 0,
    '11': 0,
    '12': 0
  };
  public filterObj: any = {
    region: REGIONS[0],
    year: new Date().getFullYear()
  }

  constructor(private dataService: DataService) {
    this.userDetails = this.dataService.getLoggedInUserData();
    // @ts-ignore
  }

  async ngOnInit(): Promise<void> {
    this.getYearlyEntries(<number>this.filterObj.year);
  }

  getYearlyEntries = async (year?: number) => {
    console.log(this.filterObj.region)
    this.entries = await this.dataService.getAllEntries();
    for (const month in this.yearlyData) {
      this.yearlyData[month] = 0;
    }
     this.entries.forEach((entry) => {
      const date = entry.date.split(' ')[0];
      const entryMonth = date.split('-')[1];
      const entryYear = date.split('-')[2];
      const entryLocation = entry.location;
      // @ts-ignore
       if (entryYear == year && this.filterObj.region == entryLocation) {

          for (let month in this.yearlyData){
            if (month === entryMonth){
              this.yearlyData[month] = this.yearlyData[month]+1;
            }
          }
      }
    });
    for (const key in this.yearlyData) {
      this.monthlyEntries.push(this.yearlyData[key]);
    }
    const temp = Object.values(this.yearlyData);
    const data = temp.slice(0, 3);
    temp.splice(0, 3);
    this.monthlyEntries = temp.concat(data);
  }

}
