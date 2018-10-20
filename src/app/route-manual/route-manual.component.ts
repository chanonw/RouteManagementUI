import { DateService } from './../_service/date.service';
import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from './../_service/resthandler.service';
import { Warehouse } from '../_models/Warehouse';
import { Zone } from '../_models/Zone';
import { Car } from '../_models/Car';

declare var $: any;

@Component({
  selector: 'app-route-manual',
  templateUrl: './route-manual.component.html',
  styleUrls: ['./route-manual.component.css']
})
export class RouteManualComponent implements OnInit {
  warehouses: Warehouse;
  showInfo: string;
  zoneId: string;
  warehouseId: string;
  zone: Zone;
  cars: Car[];
  carInfo: any;
  transDate: string;
  date: string;
  carCode: string;
  delivery: any;
  selectDelivery: any = {
    deliveryId: [],
    customer: []
  };
  failedId: any;
  constructor(private restHandlerService: RestHandlerService, private dateService: DateService) {
  }

  ngOnInit() {
    this.showInfo = 'hidden';
    this.getWarehouse();
  }

  getWarehouse() {
    this.restHandlerService.getData('warehouse').subscribe(
      res => {
        this.warehouses = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getzone() {
    const data = {
      warehouseId: this.warehouseId
    };
    this.restHandlerService.postData(data, 'zone/getzone').subscribe(
      res => {
        this.zone = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getCars() {
    const data = {
      zoneId: this.zoneId
    };
    this.restHandlerService.postData(data, 'car/getcar').subscribe(
      res => {
        this.cars = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  displayData(carIndex: number) {
    this.showInfo = 'show';
    this.carInfo = {
      carCode: this.cars[carIndex].carCode,
      driverName: this.cars[carIndex].driverName
    };
  }

  getWaitingDelivery() {
    this.date = this.dateService.changeFormatDate($('#pickedDate').val().toString());
    const data = {
      transDate: this.date,
      carCode: this.carInfo.carCode
    };
    this.restHandlerService.postData(data, 'delivery/waiting').subscribe(
      res => {
        console.log(res);
        this.delivery = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  checkedDelivery(isChecked: boolean, deliveryIndex: number) {
    if (isChecked) {
      this.selectDelivery.deliveryId.push(this.delivery[deliveryIndex].deliveryId);
      this.selectDelivery.customer.push(this.delivery[deliveryIndex].customer);
    } else {
      const deliveryIdIndex = this.selectDelivery.deliveryId.indexOf(this.delivery[deliveryIndex].deliveryId);
      const customerIndex = this.selectDelivery.customer.indexOf(this.delivery[deliveryIndex].customer);
      if (deliveryIdIndex > -1) {
        this.selectDelivery.deliveryId.splice(deliveryIdIndex, 1);
        this.selectDelivery.customer.splice(customerIndex, 1);
      }
    }
  }

  saveRoute() {
    const data = {
      deliveryId: this.selectDelivery.deliveryId,
      customer:  this.selectDelivery.customer
    };
    this.restHandlerService.postData(data, 'delivery/saveroute').subscribe(
      res => {
        console.log(res);
        if (res.success) {
          $('#successModal').modal('show');
          $('#routeManualModal').modal('toggle');
        } else if (!res.success && res.partialSuccess) {
          $('#partialSuccessModal').modal('show');
          $('#routeManualModal').modal('toggle');
          this.failedId = res.failedList;
        } else {
          $('#errorModal').modal('show');
          $('#routeManualModal').modal('toggle');
        }
        this.clear();
      },
      err => {
        console.log(err);
        this.clear();
      }
    );
  }
  clear() {
    this.selectDelivery = null;
    this.carInfo = null;
    this.showInfo = 'hidden';
  }
}
