/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewRouteComponent } from './view-route.component';

describe('ViewRouteComponent', () => {
  let component: ViewRouteComponent;
  let fixture: ComponentFixture<ViewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
