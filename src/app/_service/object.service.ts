import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  constructor() {}

  isEmpty(obj: Object) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
