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
        } else {
          $('#errorModal').modal('show');
          this.showInfo = 'hidden';
          this.carCode = '';
        }
      }
    );
  }

  isEmpty(obj: Object) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
