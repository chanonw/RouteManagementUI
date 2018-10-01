/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RouteManualComponent } from './route-manual.component';

describe('RouteManualComponent', () => {
  let component: RouteManualComponent;
  let fixture: ComponentFixture<RouteManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
