/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RestHandlerService } from './resthandler.service';

describe('Service: Resthandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestHandlerService]
    });
  });

  it('should ...', inject([RestHandlerService], (service: RestHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
