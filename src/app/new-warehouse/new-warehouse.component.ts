import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from '../_service/resthandler.service';

declare var $: any;

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.css']
})
export class NewWarehouseComponent implements OnInit {
  warehouseName: string;
  lat: string;
  long: string;
  constructor(private restHandlerService: RestHandlerService ) { }

  ngOnInit() {
  }

  addNewWarehouse() {
    const data = {
      warehouseName: this.warehouseName,
      gps: this.lat + ',' + this.long
    };
    console.log(data);
    this.restHandlerService.postData(data, 'warehouse/newwarehouse').subscribe(
      res => {
        if (res.success) {
          $('#successModal').modal('show');
        } else {
          $('#errorModal').modal('show');
        }
      }
    );
  }
}
