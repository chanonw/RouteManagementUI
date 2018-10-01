import { Routes } from '@angular/router';
import { JobManualComponent } from './job-manual/job-manual.component';
import { PageNotFoundComponent } from './general-components/not-found/not-found.component';
import { RouteManualComponent } from './route-manual/route-manual.component';
import { JobRouteComponent } from './job-route/job-route.component';
import { ViewRouteComponent } from './view-route/view-route.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/jobManual', pathMatch: 'full' },
  { path: 'jobManual', component: JobManualComponent },
  { path: 'jobRoute', component: JobRouteComponent },
  { path: 'routeManual', component: RouteManualComponent },
  { path: 'viewRoute', component: ViewRouteComponent },
  { path: '**', component: PageNotFoundComponent }
];
