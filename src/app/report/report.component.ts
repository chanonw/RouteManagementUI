import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { RestHandlerService } from '../_service/resthandler.service';
import { ReportData } from '../_models/ReportData';

declare var $: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  reportMode = false;
  truckCode: string;
  reportData: ReportData;
  showInfo: string;
  constructor(private restHandlerService: RestHandlerService) {
    this.truckCode = '';
    this.showInfo = 'hidden';
  }

  ngOnInit() {}

  captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Order.pdf'); // Generated PDF
    });
  }

  getReportData() {
    const data = {
      truckCode: this.truckCode,
    };
    this.restHandlerService
      .postData(data, 'delivery/getreport')
      .subscribe(res => {
        this.showInfo = 'show';
        this.reportData = res;
        this.reportMode = true;
        $('#reportModal').modal('show');
        console.log(this.reportData);
      });
  }
}
