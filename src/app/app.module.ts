import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './general-components/not-found/not-found.component';
import { JobManualComponent } from './job-manual/job-manual.component';

import { appRoutes } from './app.routing';
import { JobRouteComponent } from './job-route/job-route.component';
import { RouteManualComponent } from './route-manual/route-manual.component';
import { RestHandlerService } from './_service/resthandler.service';
import { DateService } from './_service/date.service';
import { DriverComponent } from './driver/driver.component';
import { LeaveManageComponent } from './leave-manage/leave-manage.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { DeliverManageComponent } from './deliver-manage/deliver-manage.component';
import { DeliveryStatusComponent } from './delivery-status/delivery-status.component';
import { NewWarehouseComponent } from './new-warehouse/new-warehouse.component';
import { HomeComponent } from './general-components/home/home.component';
import { ViewRouteComponent } from './view-route/view-route.component';


@NgModule({
   declarations: [
      AppComponent,
      PageNotFoundComponent,
      HomeComponent,
      JobManualComponent,
      JobRouteComponent,
      RouteManualComponent,
      DriverComponent,
      LeaveManageComponent,
      NewCustomerComponent,
      DeliverManageComponent,
      DeliveryStatusComponent,
      NewWarehouseComponent,
      ViewRouteComponent
   ],
   imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      AgmCoreModule.forRoot({
         apiKey: '***REMOVED***'
       })
   ],
   providers: [
      RestHandlerService,
      DateService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
