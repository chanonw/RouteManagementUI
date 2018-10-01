/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobRouteComponent } from './job-route.component';

describe('JobRouteComponent', () => {
  let component: JobRouteComponent;
  let fixture: ComponentFixture<JobRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
