import { Routes } from '@angular/router';
import { JobManualComponent } from './job-manual/job-manual.component';
import { PageNotFoundComponent } from './general-components/not-found/not-found.component';
import { RouteManualComponent } from './route-manual/route-manual.component';
import { JobRouteComponent } from './job-route/job-route.component';
import { ViewRouteComponent } from './view-route/view-route.component';
import { DriverComponent } from './driver/driver.component';
import { LeaveManageComponent } from './leave-manage/leave-manage.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { DeliverManageComponent } from './deliver-manage/deliver-manage.component';
import { DeliveryStatusComponent } from './delivery-status/delivery-status.component';
import { NewWarehouseComponent } from './new-warehouse/new-warehouse.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/jobManual', pathMatch: 'full' },
  { path: 'jobManual', component: JobManualComponent },
  { path: 'jobRoute', component: JobRouteComponent },
  { path: 'routeManual', component: RouteManualComponent },
  { path: 'viewRoute', component: ViewRouteComponent },
  { path: 'createDriver', component: DriverComponent},
  { path: 'leaveManage', component: LeaveManageComponent},
  { path: 'newcustomer', component: NewCustomerComponent},
  { path: 'deliverManage', component: DeliverManageComponent},
  { path: 'deliveryStatus', component: DeliveryStatusComponent},
  { path: 'newwarehouse', component: NewWarehouseComponent},
  { path: '**', component: PageNotFoundComponent }
];
