/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobManualComponent } from './job-manual.component';

describe('JobManualComponent', () => {
  let component: JobManualComponent;
  let fixture: ComponentFixture<JobManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
