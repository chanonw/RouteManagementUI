import { Warehouse } from './../_models/Warehouse';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../_models/Customer';
import { RestHandlerService } from '../_service/resthandler.service';
import { Zone } from './../_models/Zone';
import { DateService } from '../_service/date.service';

declare var $: any;
@Component({
  selector: 'app-customer-zone',
  templateUrl: './customer-zone.component.html',
  styleUrls: ['./customer-zone.component.css'],
})
export class CustomerZoneComponent implements OnInit {
  customerIndex: number;
  cusCode: string;
  customer: Customer[];
  message: string;
  warehouses: Warehouse[];
  zone: Zone[];
  zoneId: string;
  warehouseId: string;
  lat: string;
  long: string;
  cusType: string;
  day: string;
  distanceToWh: number;
  dayInWeek: number;
  cusTypeObj = [
    {
      name: 'บ้านพักคนไทย',
      value: 'บ้านพักคนไทย',
    },
    {
      name: 'อาคารสำนักงาน',
      value: 'อาคารสำนักงาน',
    },
  ];
  // dayObj = [
  //   {
  //     day: 'จันทร์',
  //     value: 'จันทร์'
  //   },
  //   {
  //     day: 'อังคาร',
  //     value: 'อังคาร'
  //   },
  //   {
  //     day: 'พุธ',
  //     value: 'พุธ'
  //   },
  //   {
  //     day: 'พฤหัสบดี',
  //     value: 'พฤหัสบดี'
  //   },
  //   {
  //     day: 'ศุกร์',
  //     value: 'ศุกร์'
  //   },
  //   {
  //     day: 'เสาร์',
  //     value: 'เสาร์'
  //   },
  //   {
  //     day: 'อาทิตย์',
  //     value: 'อาทิตย์'
  //   }
  // ];
  constructor(
    private restHandlerService: RestHandlerService,
    private dateService: DateService,
  ) {}

  ngOnInit() {
    this.getNewCustomer();
    this.getWarehouse();
  }

  passIndexValue(index: number) {
    this.customerIndex = index;
    // $('#deliveryStatusModal').modal('show');
  }

  getNewCustomer() {
    this.restHandlerService
      .getData('customer/getnewcustomer')
      .subscribe(res => {
        this.customer = res;
      });
  }

  getWarehouse() {
    this.restHandlerService.getData('warehouse').subscribe(
      res => {
        this.warehouses = res;
      },
      err => {
        console.log(err);
      },
    );
  }
  getzone() {
    const data = {
      warehouseId: this.warehouseId,
    };
    this.restHandlerService.postData(data, 'zone/getzone').subscribe(
      res => {
        this.zone = res;
      },
      err => {
        console.log(err);
      },
    );
  }
  update() {
    this.dayInWeek = this.customer[this.customerIndex].dayInWeek;
    const data = {
      cusCode: this.customer[this.customerIndex].cusCode,
      zoneId: this.zoneId,
      gps: this.lat + ',' + this.long,
      cusCond: 'ปกติ',
      cusType: this.cusType,
      day: this.day,
      distanceToWh: this.distanceToWh,
    };
    console.log(data);
    this.restHandlerService
      .postData(data, 'customer/updatezone')
      .subscribe(res => {
        if (res.success) {
          if (this.dayInWeek !== 99) {
            const today = this.dateService.changeFormatDate(
              new Date('2019, 3, 24').toString(),
            );
            const date = this.dateService.changeFormatDate(
              this.nextWeeKDayDate(today, this.dayInWeek).toString(),
            );
            console.log('today is: ', today);
            console.log('date is: ', date);
            const order = {
              cusCode: this.customer[this.customerIndex].cusCode,
              quantity: this.customer[this.customerIndex].depBottle,
              transDate: date,
            };
            console.log('order: ', order);
            this.restHandlerService
              .postData(order, 'delivery/newOrder')
              .subscribe(res2 => {
                if (res2.success) {
                  $('#successModal').modal('show');
                  this.clear();
                  // $('#customerZoneModal').modal('toggle');
                }
              });
          }
        } else {
          $('#errorModal').modal('show');
        }
      });
  }

  clear() {
    this.customer = null;
  }

  getDayValueFromCheckbox(event) {
    console.log(event.target.value);
    this.day = event.target.value;
    if (this.day === 'จันทร์') {
      this.dayInWeek = 1;
    } else if (this.day === 'อังคาร') {
      this.dayInWeek = 2;
    } else if (this.day === 'พุธ') {
      this.dayInWeek = 3;
    } else if (this.day === 'พฤหัสบดี') {
      this.dayInWeek = 4;
    } else if (this.day === 'ศุกร์') {
      this.dayInWeek = 5;
    } else if (this.day === 'เสาร์') {
      this.dayInWeek = 6;
    } else if (this.day === 'อาทิตย์') {
      this.dayInWeek = 7;
    } else {
      this.dayInWeek = 99;
    }
  }

  calculateDistanceToWh() {
    const index = this.warehouses
      .map(i => i.warehouseId)
      .indexOf(this.warehouseId);
    const warehouseGps = this.warehouses[index].gps.split(',');
    // console.log(warehouseGps);
    const warehouseLat = parseFloat(warehouseGps[0]);
    const warehouseLong = parseFloat(warehouseGps[1]);
    // console.log(warehouseLat, warehouseLong);
    const lat = parseFloat(this.lat);
    const long = parseFloat(this.long);
    // console.log(lat, long);
    // const latDiff = lat - warehouseLat;
    // const longDiff = long - warehouseLong;
    // console.log(latDiff, longDiff);
    // const distance = Math.sqrt(Math.pow(latDiff, 2) + Math.pow(longDiff, 2));
    // console.log(distance);
    // this.distanceToWh = distance;
    this.distanceToWh = this.getDistance(
      warehouseLat,
      warehouseLong,
      lat,
      long,
    );
  }

  getDistance(lat1: number, long1: number, lat2: number, long2: number) {
    const d2r = Math.PI / 180;
    const eQuatorialEarthRadius = 6378.137;
    const dLat = (lat2 - lat1) * d2r;
    const dLong = (long2 - long1) * d2r;
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(lat1 * d2r) *
        Math.cos(lat2 * d2r) *
        Math.pow(Math.sin(dLong / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = eQuatorialEarthRadius * c;
    console.log(a, c, d);
    return Number(d.toFixed(2));
  }

  nextWeeKDayDate(date, dayInWeek) {
    const ret = new Date(date || new Date());
    ret.setDate(ret.getDate() + ((dayInWeek - 1 - ret.getDay() + 7) % 7) + 1);
    return ret;
  }
}
