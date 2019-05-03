import { Delivery } from './../_models/Delivery';
import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from '../_service/resthandler.service';
import { DateService } from '../_service/date.service';
import { Customer } from '../_models/Customer';

declare var $: any;

@Component({
  selector: 'app-generate-order',
  templateUrl: './generate-order.component.html',
  styleUrls: ['./generate-order.component.css'],
})
export class GenerateOrderComponent implements OnInit {
  date: string;
  customer: Customer[];
  message: string;
  delivery: any[];
  constructor(
    private restHandlerService: RestHandlerService,
    private dateService: DateService,
  ) {}

  ngOnInit() {}

  getWeekDayName() {
    const days = [
      'อาทิตย์',
      'จันทร์',
      'อังคาร',
      'พุธ',
      'พฤหัสบดี',
      'ศุกร์',
      'เสาร์',
    ];
    this.date = this.dateService.changeFormatDate(
      $('#pickedDate')
        .val()
        .toString(),
    );
    const d = new Date(this.date);
    const dayName = days[d.getDay()];
    console.log(dayName);
    return dayName;
  }

  generateOrder() {
    const days = [
      'อาทิตย์',
      'จันทร์',
      'อังคาร',
      'พุธ',
      'พฤหัสบดี',
      'ศุกร์',
      'เสาร์',
    ];
    this.date = this.dateService.changeFormatDate(
      $('#pickedDate')
        .val()
        .toString(),
    );
    const d = new Date(this.date);
    const dayName = days[d.getDay()];
    const data = {
      dayName: dayName,
    };
    this.restHandlerService
      .postData(data, 'customer/getCustomerPerDay')
      .subscribe(res => {
        console.log('response length: ', res.length);
        if (res.length !== 0) {
          this.customer = res;
          console.log(this.customer);
          if (this.customer.length > 0) {
            console.log('begin generate order');
            for (const item of this.customer) {
              const order = {
                transDate: this.date,
                cusCode: item.cusCode,
                quantity: item.depBottle,
              };
              console.log('order: ', order);
              this.restHandlerService
                .postData(order, 'delivery/newOrder')
                .subscribe(res2 => {
                  if (res2.success) {
                    console.log('success');
                  }
                });
            }
            this.message = 'สร้างรอบจัดส่งสำเร็จ';
            $('#successModal').modal('show');
          }
        } else {
          // alert
          this.message = 'ไม่มีลูกค้าสมาชิกที่ต้องการให้จัดส่งวันนี้';
          $('#errorModal').modal('show');
        }
      });
  }
}
