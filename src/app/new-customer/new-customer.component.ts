import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from '../_service/resthandler.service';
import { error } from '@angular/compiler/src/util';
declare var $: any;

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  model: any = {};
  constructor(private restHandlerService: RestHandlerService ) { }

  ngOnInit() {
  }

  addCustomer() {
    this.restHandlerService.postData(this.model, 'customer/newcustomer').subscribe(
      res => {
        if (res.success) {
          $('#successModal').modal('show');
        } else {
          $('#errorModal').modal('show');
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
