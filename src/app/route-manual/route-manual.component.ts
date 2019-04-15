import { DateService } from './../_service/date.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestHandlerService } from './../_service/resthandler.service';
import { Warehouse } from '../_models/Warehouse';
import { Zone } from '../_models/Zone';
import { Truck } from '../_models/Truck';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-route-manual',
  templateUrl: './route-manual.component.html',
  styleUrls: ['./route-manual.component.css'],
})
export class RouteManualComponent implements OnInit {
  @Input() orderFromJobRoute: any;
  @Output() cancelManual = new EventEmitter();
  // @Output() successManual = new EventEmitter();
  selectedTruck: Truck[] = []; // Array<string> = [];
  unUsedTruck: Truck[] = []; // Array<string> = [];
  warehouses: Warehouse;
  showInfo: string;
  zoneId: string;
  warehouseId: string;
  zone: Zone;
  trucks: Truck[];
  carInfo: any;
  transDate: string;
  date: string;
  carCode: string;
  delivery: any;
  selectDelivery: any = {
    deliveryId: [],
    customer: [],
  };
  failedId: any;
  constructor(
    private restHandlerService: RestHandlerService,
    private dateService: DateService,
    private router: Router
  ) {
    $(function() {
      $('[data-toggle="popover"]').popover();
    });
  }

  ngOnInit() {
    console.log(this.orderFromJobRoute);
    this.trucks = this.orderFromJobRoute.trucks;
    this.unUsedTruck = Object.assign([], this.orderFromJobRoute.trucks);
    // for (let index = 0; index < this.trucks.length; index++) {
    //   this.unUsedTruck.push(this.trucks[index].truckCode);
    // }
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

  getCars() {
    const data = {
      zoneId: this.zoneId,
    };
    this.restHandlerService.postData(data, 'truck/gettruck').subscribe(
      res => {
        this.trucks = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  displayData(truckIndex: number) {
    this.showInfo = 'show';
    this.carInfo = {
      carCode: this.trucks[truckIndex].truckCode,
      driverName:
        this.trucks[truckIndex].firstName +
        ' ' +
        this.trucks[truckIndex].lastName,
    };
  }

  getWaitingDelivery() {
    this.date = this.dateService.changeFormatDate(
      $('#pickedDate')
        .val()
        .toString(),
    );
    const data = {
      transDate: this.date,
      carCode: this.carInfo.carCode,
    };
    this.restHandlerService.postData(data, 'delivery/waiting').subscribe(
      res => {
        console.log(res);
        this.delivery = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  checkedDelivery(isChecked: boolean, deliveryIndex: number) {
    if (isChecked) {
      this.selectDelivery.deliveryId.push(
        this.delivery[deliveryIndex].deliveryId,
      );
      this.selectDelivery.customer.push(this.delivery[deliveryIndex].customer);
    } else {
      const deliveryIdIndex = this.selectDelivery.deliveryId.indexOf(
        this.delivery[deliveryIndex].deliveryId,
      );
      const customerIndex = this.selectDelivery.customer.indexOf(
        this.delivery[deliveryIndex].customer,
      );
      if (deliveryIdIndex > -1) {
        this.selectDelivery.deliveryId.splice(deliveryIdIndex, 1);
        this.selectDelivery.customer.splice(customerIndex, 1);
      }
    }
  }

  saveRoute() {
    const data = {
      deliveryId: this.selectDelivery.deliveryId,
      customer: this.selectDelivery.customer,
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
      },
    );
  }
  clear() {
    this.selectDelivery = null;
    this.carInfo = null;
    this.showInfo = 'hidden';
  }

  cancel() {
    this.cancelManual.emit(false);
  }

  selectTruck(truckIndex: number) {
    if (this.trucks[truckIndex].color === 'black') {
      console.log(this.trucks[truckIndex].color);
      console.log(this.trucks[truckIndex].truckCode);
      this.trucks[truckIndex].color = 'green';
      this.selectedTruck.push(this.trucks[truckIndex]);
    } else {
      this.trucks[truckIndex].color = 'black';
      const index = this.selectedTruck.indexOf(this.trucks[truckIndex]);
      if (index > -1) {
        this.selectedTruck.splice(index, 1);
        // this.unUsedTruck.push(this.trucks[truckIndex].truckCode);
      }
    }
  }

  manualRoute() {
    console.log(this.selectedTruck);
    for (let i = 0; i < this.selectedTruck.length; i++) {
      // console.log(this.selectedTruck[i]);
      const index = this.unUsedTruck.indexOf(this.selectedTruck[i]);
      if (index > -1) {
        this.unUsedTruck.splice(index, 1);
      }
    }
    console.log(this.unUsedTruck);
    const data = {
      unUsedTruck: this.unUsedTruck,
      selectedTruck: this.selectedTruck,
      transDate: this.orderFromJobRoute.transDate,
      deliveries: this.orderFromJobRoute.deliveries
    };
    this.restHandlerService.postData(data, 'delivery/manual').subscribe(
      res => {
        if (res.success) {
          $('#successModal').modal('show');
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate(['/jobRoute']);
          // this.router.navigate(['/jobRoute']);
          // this.cancelManual.emit(false);
          // this.successManual.emit(false);
        } else {
          $('#errorModal').modal('show');
        }
      }
    );
  }
}
