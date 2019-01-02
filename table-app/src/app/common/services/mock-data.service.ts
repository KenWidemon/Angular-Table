import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_DATA } from '../constants/mock-data.constant';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() {}

  getData(): Observable<any[]> {
    return of(MOCK_DATA); // create a fake response since we don't have an http endpoint
  }

  getColumns(data: any): string[] {
    return Object.keys(data);
  }
}
