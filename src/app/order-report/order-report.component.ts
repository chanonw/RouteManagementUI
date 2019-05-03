import { Delivery } from './../_models/Delivery';
import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ReportData } from '../_models/ReportData';
import { RestHandlerService } from '../_service/resthandler.service';
import { Gps } from './../_models/Gps';
declare var $: any;

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css'],
})
export class OrderReportComponent implements OnInit {
  reportMode = false;
  truckCode: string;
  reportData: ReportData;
  showInfo: string;
  firstTrip: Delivery[];
  secondTrip: Delivery[];
  totalFirstTrip: number;
  totalSecondTrip: number;
  distanceFirst: number;
  distanceSecond: number;
  gps: Gps[];
  constructor(private restHandlerService: RestHandlerService) {
    this.truckCode = '';
    this.showInfo = 'hidden';
  }

  ngOnInit() {}

  captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Address.pdf'); // Generated PDF
    });
  }

  getReportData() {
    const data = {
      truckCode: this.truckCode,
    };
    this.restHandlerService
      .postData(data, 'delivery/getreport')
      .subscribe(res => {
        this.showInfo = 'show';
        this.reportData = res;
        // this.firstTrip = this.reportData.firstTrip;
        // this.secondTrip = this.reportData.secondTrip;
        this.totalFirstTrip = this.reportData.totalFirstQuantity;
        this.totalSecondTrip = this.reportData.totalSecondQuantity;
        this.distanceFirst = Number(this.reportData.distanceFirst.toFixed(2));
        this.distanceSecond = Number(this.reportData.distanceSecond.toFixed(2));
        this.reportMode = true;
        $('#reportModal').modal('show');
        console.log(this.reportData);
      });
  }

  calTotalQuantity(delivery: Delivery[]) {
    let quantity = 0;
    for (let index = 0; index < delivery.length; index++) {
      quantity = quantity + delivery[index].quantity;
    }
    return quantity;
  }

  calTotalDistance(delivery: Delivery[]) {
    let totalDistance = 0;
    const tmpWarehouseGPS = '13.698936,100.487154';
    const wgps = tmpWarehouseGPS.split(',');
    const warehouseLat = parseFloat(wgps[0]);
    const warehouseLong = parseFloat(wgps[1]);
    const start = new Gps(warehouseLat, warehouseLong);
    this.gps.push(start);
    for (let index = 0; index < delivery.length; index++) {
      const cusGps = delivery[index].customer.gps.split(',');
      const dropPoint = new Gps(parseFloat(cusGps[0]), parseFloat(cusGps[1]));
      this.gps.push(dropPoint);
    }
    this.gps.push(start);
    for (let i = 0; i + 1 < this.gps.length; i++) {
      const lat1 = this.gps[i].lat;
      const long1 = this.gps[i].long;
      const lat2 = this.gps[i + 1].lat;
      const long2 = this.gps[i + 1].long;
      totalDistance = totalDistance + this.getDistance(lat1, long1, lat2, long2);
    }
    return Number(totalDistance.toFixed(2));
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
}
