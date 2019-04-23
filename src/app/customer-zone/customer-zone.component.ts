import { Component, OnInit } from '@angular/core';
import { Customer } from '../_models/Customer';
import { RestHandlerService } from '../_service/resthandler.service';
import { Warehouse } from '../_models/Warehouse';
import { Zone } from './../_models/Zone';

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
  cusCond: string;
  day: string;
  distanceToWh: number;
  constructor(private restHandlerService: RestHandlerService) {}

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
    const data = {
      cusCode: this.customer[this.customerIndex].cusCode,
      zoneId: this.zoneId,
      gps: this.lat + ',' + this.long,
      cusCond: this.cusCond,
      cusType: this.cusType,
      day: this.day,
      distanceToWh: this.distanceToWh
    };
    this.restHandlerService.postData(data, 'customer/updatezone').subscribe(
      res => {
        if (res.success) {
          $('#successModal').modal('show');
        } else {
          $('#errorModal').modal('show');
        }
      }
    );
  }
}
