import { Component, OnInit } from '@angular/core';
import { RestHandlerService } from '../_service/resthandler.service';
import { Delivery } from '../_models/Delivery';
import { ObjectService } from '../_service/object.service';
import { DateService } from '../_service/date.service';

declare var $: any;

@Component({
  selector: 'app-deliver-manage',
  templateUrl: './deliver-manage.component.html',
  styleUrls: ['./deliver-manage.component.css'],
})
export class DeliverManageComponent implements OnInit {
  cusCode: string;
  delivery: Delivery;
  showInfo: string;
  date: string;
  transDate: string;
  message: string;
  constructor(
    private restHandlerService: RestHandlerService,
    private objectService: ObjectService,
    private dateService: DateService,
  ) {
    this.cusCode = '';
    this.showInfo = 'hidden';
  }

  ngOnInit() {}

  getDelivery() {
    this.date = this.dateService.changeFormatDate(
      $('#pickedDate')
        .val()
        .toString(),
    );
    const data = {
      cusCode: this.cusCode,
      transDate: this.date,
    };
    this.restHandlerService
      .postData(data, 'delivery/getcustomerdelivery')
      .subscribe(res => {
        if (!this.objectService.isEmpty(res)) {
          console.log(res);
          this.showInfo = 'show';
          this.delivery = res;
          this.transDate = this.dateService.getDate(this.delivery.transDate);
        } else {
          this.message = 'ไม่พบรอบจัดส่ง';
          $('#errorModal').modal('show');
          this.showInfo = 'hidden';
          this.cusCode = '';
        }
      });
  }
  cancelDelivery() {
    const data = {
      deliveryId: this.delivery.deliveryId,
    };
    this.restHandlerService.postData(data, 'delivery/cancel').subscribe(res => {
      if (res.success === true) {
        this.message = 'ยกเลิกสำเร็จ';
        $('#successModal').modal('show');
      } else {
        this.message = 'ไม่พบรอบจัดส่ง';
        $('#errorModal').modal('show');
      }
    });
  }

  changeDeliveryDate() {
    const transDate = this.dateService.changeFormatDate(
      $('#pickedDate2')
        .val()
        .toString(),
    );
    const data = {
      deliveryId: this.delivery.deliveryId,
      transDate: transDate,
      cusCode: this.delivery.cusCode,
    };
    this.restHandlerService.postData(data, 'delivery/changedeliverydate').subscribe(
      res => {
       if (res.success === true) {
        this.message = 'เลื่อนการจัดส่งสำเร็จ';
        $('#successModal').modal('show');
       } else {
        this.message = 'ไม่พบรอบจัดส่ง';
        $('#errorModal').modal('show');
       }
      }
    );
  }
}
