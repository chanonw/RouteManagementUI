import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from '../_service/resthandler.service';

declare var $: any;

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.css']
})
export class NewWarehouseComponent implements OnInit {
  model: any = {};
  constructor(private restHandlerService: RestHandlerService ) { }

  ngOnInit() {
  }

  addNewWarehouse() {
    this.restHandlerService.postData(this.model, 'warehouse/newwarehouse').subscribe(
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
