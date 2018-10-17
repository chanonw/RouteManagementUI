import { Zone } from './../_models/Zone';
import { Warehouse } from './../_models/Warehouse';
import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from './../_service/resthandler.service';
import { Car } from '../_models/Car';
declare var $: any;
@Component({
  selector: 'app-job-manual',
  templateUrl: './job-manual.component.html',
  styleUrls: ['./job-manual.component.css'],
  providers: [RestHandlerService]
})
export class JobManualComponent implements OnInit {
  showInfo: string;
  cars: Car[];
  warehouses: Warehouse;
  delivery: any;
  zone: Zone;
  date: string;
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
  constructor(private restHandlerService: RestHandlerService) {
    const tmpDate = new Date(Date.now());
    this.date = this.getDate(tmpDate);
    this.showInfo = 'hidden';
  }

  ngOnInit() {
    this.getWarehouse();
    this.getCars();
    // $('.datepicker').datepicker({
    //   format: 'dd/mm/yyyy',
    // });
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

  getDelivery() {
    console.log(this.date);
    this.restHandlerService.getData('delivery').subscribe(
      res => {
        this.delivery = res;
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
    (this.carCode = this.cars[carIndex].carCode), console.log(this.carInfo);
  }

  onWarehouseSelected(event) {
    console.log(event.target.value);
  }
  private changeDateTime(date): string {
    const d = new Date(date),
      minutes =
        d.getMinutes().toString().length === 1
          ? '0' + d.getMinutes()
          : d.getMinutes(),
      hours =
        d.getHours().toString().length === 1
          ? '0' + d.getHours()
          : d.getHours(),
      ampm = d.getHours() >= 12 ? 'pm' : 'am',
      months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      days[d.getDay()] +
      ' ' +
      months[d.getMonth()] +
      ' ' +
      d.getDate() +
      ' ' +
      d.getFullYear() +
      ' ' +
      hours +
      ':' +
      minutes +
      ampm
    );
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
      // carCode: this.carInfo.carCode
      carCode: 'car11'
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

  private getDate(inputDate: Date) {
    const tmpDate = this.setDay(inputDate.getDate()) + '/' + this.setMonth(inputDate.getMonth()) + '/' + inputDate.getFullYear();
    return tmpDate;
  }
  private setMonth(month: number) {
    month = month + 1;
    let new_month = month.toString();
    if (month === 13) {
      new_month = '01';
    }
    if (month < 10) {
      new_month = '0' + new_month;
    }
    return new_month;
  }

  private setDay(day: number) {
    let new_day = day.toString();
    if (day < 10) {
      new_day = '0' + day;
    }
    return new_day;
  }

}
