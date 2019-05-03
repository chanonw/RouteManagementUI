import { Routes } from '@angular/router';
import { JobManualComponent } from './job-manual/job-manual.component';
import { PageNotFoundComponent } from './general-components/not-found/not-found.component';
import { RouteManualComponent } from './route-manual/route-manual.component';
import { JobRouteComponent } from './job-route/job-route.component';
import { DriverComponent } from './driver/driver.component';
import { LeaveManageComponent } from './leave-manage/leave-manage.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { DeliverManageComponent } from './deliver-manage/deliver-manage.component';
import { DeliveryStatusComponent } from './delivery-status/delivery-status.component';
import { NewWarehouseComponent } from './new-warehouse/new-warehouse.component';
import { HomeComponent } from './general-components/home/home.component';
import { ViewRouteComponent } from './view-route/view-route.component';
import { ReportComponent } from './report/report.component';
import { CustomerZoneComponent } from './customer-zone/customer-zone.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { GenerateOrderComponent } from './generate-order/generate-order.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'jobManual', component: JobManualComponent },
  { path: 'jobRoute', component: JobRouteComponent,
    children: [
      {
        path: 'manual', component: RouteManualComponent
      }
    ]},
  { path: 'createDriver', component: DriverComponent},
  { path: 'viewRoute', component: ViewRouteComponent},
  { path: 'genPdf', component: ReportComponent},
  { path: 'genOrderPdf', component: OrderReportComponent},
  { path: 'leaveManage', component: LeaveManageComponent},
  { path: 'newcustomer', component: NewCustomerComponent},
  // { path: 'deliverManage', component: DeliverManageComponent},
  { path: 'deliveryStatus', component: DeliveryStatusComponent},
  { path: 'newwarehouse', component: NewWarehouseComponent},
  { path: 'chooseCusZone', component: CustomerZoneComponent},
  { path: 'genOrder', component: GenerateOrderComponent},
  { path: '**', component: PageNotFoundComponent }
];
