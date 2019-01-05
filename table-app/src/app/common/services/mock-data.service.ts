import { Injectable } from '@angular/core';
import { MOCK_DATA } from '../constants/mock-data.constant';

@Injectable({
  providedIn: 'root' // no need to import in Providers[] in AppModule
})
export class MockDataService {

  constructor() {}

  getData(): Promise<any[]> {
    // create a fake response since we don't have an http endpoint
    return new Promise((resolve) => {
      resolve(MOCK_DATA);
    });
  }

  getColumns(data: any): string[] {
    return Object.keys(data); // just set columns equal to first row's keys
  }
}
