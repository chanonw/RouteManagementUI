import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './general-components/not-found/not-found.component';
import { JobManualComponent } from './job-manual/job-manual.component';

import { appRoutes } from './app.routing';
import { JobRouteComponent } from './job-route/job-route.component';
import { RouteManualComponent } from './route-manual/route-manual.component';
import { ViewRouteComponent } from './view-route/view-route.component';


@NgModule({
   declarations: [
      AppComponent,
      PageNotFoundComponent,
      JobManualComponent,
      JobRouteComponent,
      RouteManualComponent,
      ViewRouteComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
