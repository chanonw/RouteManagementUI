import { Component, OnInit, ViewChild } from '@angular/core';
import { Truck } from '../_models/Truck';
import { RestHandlerService } from '../_service/resthandler.service';
import { DateService } from '../_service/date.service';
import {} from 'googlemaps';

declare var google: any;
declare var $: any;

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.component.html',
  styleUrls: ['./view-route.component.css'],
})
export class ViewRouteComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  overviewJson: any;
  truckCode: string;
  truck: Truck;
  trip: any;
  date: string;
  route: any;
  leg: any;
  waypointOrder: any;
  geoCodeWaypoint: any;
  markers: any[];
  // lat = 35.2271;
  // lng = -80.8431;
  // zoom = 15;
  constructor(
    private restHandlerService: RestHandlerService,
    private dateService: DateService,
  ) {
    this.truckCode = '';
    this.trip = [
      {
        tripNo: '1',
      },
      {
        tripNo: '2',
      },
    ];
  }

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(13.720937, 100.52795),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  viewMapTrip(index: number) {
    const data = {
      truckCode: this.truckCode,
      // transDate: this.date,
      trip: this.trip[index].tripNo,
    };
    this.restHandlerService
      .postData(data, 'delivery/getpolyline')
      .subscribe(res => {
        console.log(res);
        const mapProp = {
          center: new google.maps.LatLng(13.720937, 100.52795),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.overviewJson = res.overviewPath;
        this.route = res.route;
        this.waypointOrder = res.waypointOrder;
        this.geoCodeWaypoint = res.geoCodeWaypoint;
        this.leg = res.leg;
        const decode = google.maps.geometry.encoding.decodePath(
          this.overviewJson.points,
        );
        const line = new google.maps.Polyline({
          path: decode,
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 4,
          zIndex: 3,
        });
        line.setMap(this.map);
      });
    $('#mapModal').modal('show');
  }

  viewMap(index: number) {
    const data = {
      truckCode: this.truckCode,
      // transDate: this.date,
      trip: this.trip[index].tripNo,
    };
    this.restHandlerService
      .postData(data, 'delivery/getpolyline')
      .subscribe(res => {
        const mapProp = {
          center: new google.maps.LatLng(13.720937, 100.52795),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        const directionsDisplay = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
          map: this.map
        });
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.overviewJson = res.overviewPath;
        this.route = res.route;
        this.waypointOrder = res.waypointOrder;
        this.geoCodeWaypoint = res.geoCodeWaypoint;
        this.leg = res.leg;
        for (let i = 0; i < this.leg.length; i++) {
          const marker = new google.maps.Marker({
            position: this.leg[i].start_location,
            map: this.map,
            label: i.toString()
          });
        }
      });
      $('#mapModal').modal('show');
  }

  resetMap() {
    const mapProp = {
      center: new google.maps.LatLng(13.720937, 100.52795),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
}
