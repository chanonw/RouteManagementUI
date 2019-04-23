import { Component, OnInit } from '@angular/core';
import { Delivery } from '../_models/Delivery';
import { RestHandlerService } from '../_service/resthandler.service';
import { ObjectService } from '../_service/object.service';
import { DateService } from '../_service/date.service';

declare var $: any;


@Component({
  selector: 'app-delivery-status',
  templateUrl: './delivery-status.component.html',
  styleUrls: ['./delivery-status.component.css'],
})
export class DeliveryStatusComponent implements OnInit {
  truckCode: string;
  transDate: string;
  message: string;
  showInfo: string;
  deliveries: Delivery[];
  date: string;
  status: string;
  reason: string;
  giveback: string;
  coupon: string;
  deliveryIndex: number;
  obj = [
    {
      name: 'จัดส่งสำเร็จ',
      result: 'success'
    },
    {
      name: 'แจ้งเหตุขาดส่ง',
      result: 'fail'
    }
  ];
  constructor(
    private restHandlerService: RestHandlerService,
    private objectService: ObjectService,
    private dateService: DateService,
  ) {
    this.truckCode = '';
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
      truckCode: this.truckCode,
      transDate: this.date,
    };
    this.restHandlerService.postData(data, 'delivery/getcardelivery').subscribe(
      res => {
        if (res) {
          console.log(res);
          this.showInfo = 'show';
          this.deliveries = res;
        } else {
          this.message = 'ไม่พบรอบจัดส่ง';
          $('#errorModal').modal('show');
          this.showInfo = 'hidden';
          this.truckCode = '';
        }
      }
    );
  }

  passIndexValue(index: number) {
    this.deliveryIndex = index;
    // $('#deliveryStatusModal').modal('show');
  }

  test() {
    console.log(this.status);
    if (this.status === 'success') {
      const data = {
        deliveryId : this.deliveries[this.deliveryIndex].deliveryId,
        giveback: this.giveback,
        coupon: this.coupon
      };
      console.log(data);
      this.restHandlerService.postData(data, 'delivery/updatesuccess').subscribe(
        res => {
          if (res.success === true) {
            this.message = 'อัพเดตสถานะสำเร็จ';
            $('#successModal').modal('show');
            this.clear();
          } else {
            this.message = 'อัพเดตสถานะไม่สำเร็จ';
            $('#errorModal').modal('show');
            this.clear();
          }
        }
      );
    } else {
      const data2 = {
        deliveryId : this.deliveries[this.deliveryIndex].deliveryId,
        reason : this.reason,
      };
      console.log(data2);
      this.restHandlerService.postData(data2, 'delivery/updatefail').subscribe(
        res => {
          if (res.success === true) {
            this.message = 'อัพเดตสถานะสำเร็จ';
            $('#successModal').modal('show');
            this.clear();
          } else {
            this.message = 'อัพเดตสถานะไม่สำเร็จ';
            $('#errorModal').modal('show');
            this.clear();
          }
        }
      );
    }
  }
  clear() {
    this.truckCode = '';
    this.showInfo = 'hidden';
  }
}
