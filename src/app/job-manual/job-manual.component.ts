import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-manual',
  templateUrl: './job-manual.component.html',
  styleUrls: ['./job-manual.component.css']
})
export class JobManualComponent implements OnInit {
  cars: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCars();
  }
  getCars() {
    this.http.get('http://localhost:5000/api/cars').subscribe(
      res => {
        this.cars = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
