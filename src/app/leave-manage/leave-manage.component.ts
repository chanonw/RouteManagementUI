import { Truck } from './../_models/Truck';
import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from '../_service/resthandler.service';
declare var $: any;
@Component({
  selector: 'app-leave-manage',
  templateUrl: './leave-manage.component.html',
  styleUrls: ['./leave-manage.component.css']
})
export class LeaveManageComponent implements OnInit {
  truckCode: string;
  showInfo: string;
  truck: Truck;
  pleave: boolean;
  sleave: boolean;
  constructor(private restHandlerService: RestHandlerService) {
    this.truckCode = '';
    this.showInfo = 'hidden';
  }

  ngOnInit() {
  }

  searchCar(): void {
    const data = {
      truckCode: this.truckCode
    };
    this.restHandlerService.postData(data, 'truck/searchtruck').subscribe(
      res => {
        console.log(res);
        if (!this.isEmpty(res)) {
          this.showInfo = 'show';
          this.truck = res;
          if (this.truck.personalLeave === true) {
            this.pleave = true;
          } else {
            this.pleave = false;
          }
          if (this.truck.sickLeave === true) {
            this.sleave = true;
          } else {
            this.sleave = false;
          }
        } else {
          $('#errorModal').modal('show');
          this.showInfo = 'hidden';
          this.truckCode = '';
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
      truckCode: this.truckCode
    };
    this.restHandlerService.postData(data, 'truck/updatepersonalleave').subscribe(
      res => {
        console.log(res);
        this.truck = res;
        this.showInfo = 'show';
        if (this.truck.personalLeave === true) {
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
      truckCode: this.truckCode
    };
    this.restHandlerService.postData(data, 'truck/updatesickleave').subscribe(
      res => {
        console.log(res);
        this.truck = res;
        this.showInfo = 'show';
        if (this.truck.sickLeave === true) {
          this.sleave = true;
        } else {
          this.sleave = false;
        }
        $('#successModal').modal('show');
      }
    );
  }
}
