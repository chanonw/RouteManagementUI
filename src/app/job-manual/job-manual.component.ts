import { DateService } from './../_service/date.service';
import { Zone } from './../_models/Zone';
import { Warehouse } from './../_models/Warehouse';
import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from './../_service/resthandler.service';
import { Truck } from '../_models/Truck';

declare var $: any;

@Component({
  selector: 'app-job-manual',
  templateUrl: './job-manual.component.html',
  styleUrls: ['./job-manual.component.css'],
  providers: [RestHandlerService]
})

export class JobManualComponent implements OnInit {
  showInfo: string;
  trucks: Truck[];
  warehouses: Warehouse;
  delivery: any;
  zone: Zone;
  date: string;
  tranDate: string;
  zoneId: string;
  warehouseId: string;
  carInfo: any;
  capacity: number;
  model: any;
  selectDelivery: any = {
    deliveryId: [],
    quantity: []
  };
  transdate: string;
  failedId: any;
  carCode: string;
  constructor(private restHandlerService: RestHandlerService, private dateService: DateService) {
    this.showInfo = 'hidden';
  }

  ngOnInit() {
    this.getWarehouse();
    // this.getCars();
  }

  getTrucks() {
    const data = {
      zoneId: this.zoneId
    };
    this.restHandlerService.postData(data, 'truck/gettruck').subscribe(
      res => {
        console.log(res);
        this.trucks = res;
      },
      err => {
        console.log(err);
      }
    );
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

  getUnassignDelivery() {
    this.date = this.dateService.changeFormatDate($('#pickedDate').val().toString());
    const data = {
      transDate: this.date
    };
    this.restHandlerService.postData(data, 'delivery/unassign').subscribe(
      res => {
        this.delivery = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  displayData(truckIndex: number) {
    this.showInfo = 'show';
    this.carInfo = {
      carCode: this.trucks[truckIndex].truckCode,
      driverName: this.trucks[truckIndex].firstName + this.trucks[truckIndex].lastName
    };
  }

  onWarehouseSelected(event) {
    console.log(event.target.value);
  }

  checkedDelivery(isChecked: boolean, deliveryIndex: number) {
    let temp = 0;
    if (isChecked) {
      this.selectDelivery.deliveryId.push(
        this.delivery[deliveryIndex].deliveryId
      );
      this.selectDelivery.quantity.push(this.delivery[deliveryIndex].quantity);
    } else {
      const deliveryIdIndex = this.selectDelivery.deliveryId.indexOf(
        this.delivery[deliveryIndex].deliveryId
      );
      const quantityIndex = this.selectDelivery.quantity.indexOf(
        this.delivery[deliveryIndex].quantity
      );
      if (quantityIndex > -1 && deliveryIdIndex > -1) {
        this.selectDelivery.deliveryId.splice(deliveryIdIndex, 1);
        this.selectDelivery.quantity.splice(quantityIndex, 1);
      }
    }
    for (const quan of this.selectDelivery.quantity) {
      temp = temp + quan;
    }
    this.capacity = temp;
  }

  saveJob() {
    const data = {
      deliveryId: this.selectDelivery.deliveryId,
      carCode: this.carInfo.carCode
      // carCode: 'car11'
    };
    this.restHandlerService.postData(data, 'delivery/savejob').subscribe(
      res => {
        console.log(res);
        if (res.success) {
          $('#successModal').modal('show');
          $('#jobManualModal').modal('toggle');
        } else if (!res.success && res.partialSuccess) {
          $('#partialSuccessModal').modal('show');
          $('#jobManualModal').modal('toggle');
          this.failedId = res.failedList;
        } else {
          $('#errorModal').modal('show');
          $('#jobManualModal').modal('toggle');
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
    this.capacity = 0;
    this.carInfo = null;
  }
}
