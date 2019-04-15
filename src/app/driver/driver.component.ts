import { RestHandlerService } from './../_service/resthandler.service';
import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../_models/Warehouse';
import { Truck } from './../_models/Truck';
import { Zone } from '../_models/Zone';

declare var $: any;

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent implements OnInit {
  model: any = {};
  truck: Truck;
  warehouses: Warehouse;
  warehouseId: string;
  zone: Zone;
  constructor(private restHandlerService: RestHandlerService) {}

  ngOnInit() {
    this.getWarehouse();
  }

  addNewCar() {
    this.restHandlerService.postData(this.model, 'truck/newtruck').subscribe(
      res => {
        if (res.success) {
          $('#successModal').modal('show');
        }
      },
      err => {
        console.log(err);
      },
    );
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
}
