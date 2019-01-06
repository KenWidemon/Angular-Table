import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MOCK_DATA } from '../constants/mock-data.constant';

@Injectable({
  providedIn: 'root' // no need to import in Providers[] in AppModule
})
export class InMemoryDataService implements InMemoryDbService {
  /*
    * This is my fake http endpoint. The MockDataService will receive mock data from here
      instead of directly accessing the MOCK_DATA constant.
  */
  createDb() {
    const mockData = MOCK_DATA;

    // just so we have a fake endpoint for "api/submit"
    const submit = [];

    return { mockData, submit };
  }
}
