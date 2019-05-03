import { Truck } from './../_models/Truck';
import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from '../_service/resthandler.service';
import { DateService } from '../_service/date.service';
import { Warehouse } from '../_models/Warehouse';
import { Zone } from '../_models/Zone';
import { Delivery } from '../_models/Delivery';

declare var $: any;

@Component({
  selector: 'app-job-route',
  templateUrl: './job-route.component.html',
  styleUrls: ['./job-route.component.css'],
})
export class JobRouteComponent implements OnInit {
  manualMode = false;
  date: string;
  warehouses: Warehouse;
  zone: Zone;
  zoneId: string;
  warehouseId: string;
  order: Delivery[];
  object: any;

  constructor(
    private restHandlerService: RestHandlerService,
    private dateService: DateService,
  ) {
    // $(function() {
    //   $('[data-toggle="popover"]').popover();
    // });
  }

  ngOnInit() {
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

  route() {
    this.date = this.dateService.changeFormatDate(
      $('#pickedDate')
        .val()
        .toString(),
    );
    const data2 = {
      transDate: this.date
    };
    const data = {
      transDate: this.date,
      zoneId: this.zoneId,
    };
    console.log(data, data2);
    this.restHandlerService.postData(data2, 'date/checkUsedDate').subscribe(
      res => {
        if (res.usedDate === true) {
          // display message already use this date
          $('#warningModal').modal('show');
        } else {
          this.restHandlerService.postData(data, 'delivery/auto').subscribe(res2 => {
            console.log(res2);
            if (res2.success === true) {
              if (res2.manual === true) {
                // จัด Manual
                this.object = res2.dto;
                for (let i = 0; i < this.object.trucks.length; i++) {
                  this.object.trucks[i].color = 'black';
                }
                this.object.transDate = this.date;
                this.manualMode = true;
              } else {
                // display message success
                $('#successModal').modal('show');
              }
            } else {
              // display message fail
              $('#errorModal').modal('show');
            }
          });
        }
      }
    );
  }

  manualToggle() {
    this.manualMode = true;
  }

  cancelManualMode(manualMode: boolean) {
    this.manualMode = manualMode;
  }

  successManualMode(manualMode: boolean) {
    this.manualMode = manualMode;
  }
}
