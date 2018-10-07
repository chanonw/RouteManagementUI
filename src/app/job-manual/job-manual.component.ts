import { Zone } from './../_models/Zone';
import { Warehouse } from './../_models/Warehouse';
import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from './../_service/resthandler.service';

@Component({
  selector: 'app-job-manual',
  templateUrl: './job-manual.component.html',
  styleUrls: ['./job-manual.component.css'],
  providers: [RestHandlerService]
})
export class JobManualComponent implements OnInit {
  showInfo: string;
  cars: any;
  warehouses: Warehouse;
  zone: Zone;
  date: number;
  carIndex: number;
  model: any;
  warehouseId: string;
  constructor(private restHandlerService: RestHandlerService) {}

  ngOnInit() {
    this.showInfo = 'hidden';
    this.date = Date.now();
    this.getWarehouse();
    this.getCars();
  }

  getCars() {
    this.restHandlerService.getData('car/getavailablecar').subscribe(res => {
      this.cars = res;
    }, err => {
      console.log(err);
    });
  }

  getWarehouse() {
    this.restHandlerService.getData('warehouse').subscribe(res => {
      this.warehouses = res;
    }, err => {
      console.log(err);
    });
  }

  getzone() {
    let data = {};
    data = this.model.warehouseId;
    this.restHandlerService.postData(this.model, 'zone/getzone').subscribe(res => {
      this.zone = res;
    }, err => {
      console.log(err);
    });
  }
  displayData(carIndex: number) {
    this.showInfo = 'show';
  }

  onWarehouseSelected(event) {
    console.log(event.target.value);
  }
}
