import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RestHandlerService } from '../_service/resthandler.service';

declare var $: any;

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css'],
})
export class NewCustomerComponent implements OnInit {
  model: any = {};
  title: string;
  firstName: string;
  lastName: string;
  houseNo: string;
  building: string;
  road: string;
  soi: string;
  subDistrict: string;
  district: string;
  city: string;
  postalCode: string;
  depBottle: string;
  day: string;
  dayInWeek: number;
  @ViewChild('subdistrictValue') subdistrictValue: ElementRef;
  @ViewChild('districtValue') districtValue: ElementRef;
  @ViewChild('cityValue') cityValue: ElementRef;
  @ViewChild('postalCodeValue') postalCodeValue: ElementRef;

  cusTypeObj = [
    {
      name: 'บ้านพักคนไทย',
      value: 'บ้านพักคนไทย',
    },
    {
      name: 'อาคารสำนักงาน',
      value: 'อาคารสำนักงาน',
    },
  ];

  cusType: string;

  constructor(private restHandlerService: RestHandlerService) {}

  ngOnInit() {
    // $.Thailand({
    //   database: './assets/db.json',
    //   $district: $('#subdistrict'), // input ของตำบล
    //   $amphoe: $('#district'), // input ของอำเภอ
    //   $province: $('#city'), // input ของจังหวัด
    //   $zipcode: $('#postalcode'), // input ของรหัสไปรษณีย์
    // });
  }

  addCustomer() {
    const city = this.cityValue.nativeElement.value;
    let subdistrict = '';
    let district = '';
    if (city === 'กรุงเทพมหานคร') {
      subdistrict = 'แขวง' + this.subdistrictValue.nativeElement.value;
      district = 'เขต' + this.districtValue.nativeElement.value;
    } else {
      subdistrict = 'ตำบล' + this.subdistrictValue.nativeElement.value;
      district = 'อำเภอ' + this.districtValue.nativeElement.value;
    }
    const data = {
      title: this.title,
      firstName: this.firstName,
      lastName: this.lastName,
      houseNo: this.houseNo,
      building: this.building,
      road: this.road,
      soi: this.soi,
      subDistrict: subdistrict, // $('#subdistrict').val().toString(),
      district: district, // $('#district').val().toString(),
      city: city, // $('#city').val().toString(),
      postalCode: this.postalCodeValue.nativeElement.value, // $('#postalcode').val().toString(),
      depBottle: this.depBottle,
      cusType: this.cusType,
      day: this.day,
      dayInWeek: this.dayInWeek
    };
    // const data = {
    //   title: this.title,
    //   firstName: this.firstName,
    //   lastName: this.lastName,
    //   houseNo: this.houseNo,
    //   building: this.building,
    //   road: this.road,
    //   soi: this.soi,
    //   subDistrict: this.subDistrict,
    //   district: this.district,
    //   city: this.city,
    //   postalCode: this.postalCode,
    //   depBottle: this.depBottle
    // };
    console.log(data);
    this.restHandlerService.postData(data, 'customer/newcustomer').subscribe(
      res => {
        if (res.success) {
          $('#successModal').modal('show');
          this.clear();
        } else {
          $('#errorModal').modal('show');
          this.clear();
        }
      },
      err => {
        console.log(err);
      },
    );
  }
  clear() {
    this.title = '';
    this.firstName = '';
    this.lastName = '';
    this.houseNo = '';
    this.building = '';
    this.road = '';
    this.soi = '';
    this.subDistrict = '';
    this.district = '';
    this.city = '';
    this.postalCode = '';
    this.depBottle = '';
  }

  getDayValueFromCheckbox(event) {
    console.log(event.target.value);
    this.day = event.target.value;
    if (this.day === 'จันทร์') {
      this.dayInWeek = 1;
    } else if (this.day === 'อังคาร') {
      this.dayInWeek = 2;
    } else if (this.day === 'พุธ') {
      this.dayInWeek = 3;
    } else if (this.day === 'พฤหัสบดี') {
      this.dayInWeek = 4;
    } else if (this.day === 'ศุกร์') {
      this.dayInWeek = 5;
    } else if (this.day === 'เสาร์') {
      this.dayInWeek = 6;
    } else if (this.day === 'อาทิตย์') {
      this.dayInWeek = 7;
    } else {
      this.dayInWeek = 99;
    }
  }
}
