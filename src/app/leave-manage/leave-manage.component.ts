import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from '../_service/resthandler.service';
import { Car } from '../_models/Car';
declare var $: any;
@Component({
  selector: 'app-leave-manage',
  templateUrl: './leave-manage.component.html',
  styleUrls: ['./leave-manage.component.css']
})
export class LeaveManageComponent implements OnInit {
  carCode: string;
  showInfo: string;
  car: Car;
  pleave: boolean;
  sleave: boolean;
  constructor(private restHandlerService: RestHandlerService) {
    this.carCode = '';
    this.showInfo = 'hidden';
  }

  ngOnInit() {
  }

  searchCar(): void {
    const data = {
      carCode: this.carCode
    };
    this.restHandlerService.postData(data, 'car/searchcar').subscribe(
      res => {
        console.log(res);
        if (!this.isEmpty(res)) {
          this.showInfo = 'show';
          this.car = res;
          if (this.car.personalLeave === true) {
            this.pleave = true;
          } else {
            this.pleave = false;
          }
          if (this.car.sickLeave === true) {
            this.sleave = true;
          } else {
            this.sleave = false;
          }
        } else {
          $('#errorModal').modal('show');
          this.showInfo = 'hidden';
          this.carCode = '';
        }
      }
    );
  }

  private isEmpty(obj: Object) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  updatePersonalLeaveStatus() {
    const data = {
      carCode: this.carCode
    };
    this.restHandlerService.postData(data, 'car/updatepersonalleave').subscribe(
      res => {
        console.log(res);
        this.car = res;
        this.showInfo = 'show';
        if (this.car.personalLeave === true) {
          this.pleave = true;
        } else {
          this.pleave = false;
        }
        $('#successModal').modal('show');
      }
    );
  }

  updateSickLeaveStatus() {
    const data = {
      carCode: this.carCode
    };


    this.restHandlerService.postData(data, 'car/updatesickleave').subscribe(
      res => {
        console.log(res);
        this.car = res;
        this.showInfo = 'show';
        if (this.car.sickLeave === true) {
          this.sleave = true;
        } else {
          this.sleave = false;
        }
        $('#successModal').modal('show');
      }
    );
  }
}
