import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MOCK_DATA } from '../constants/mock-data.constant';

@Injectable({
  providedIn: 'root' // no need to import in Providers[] in AppModule
})
export class InMemoryDataService implements InMemoryDbService {
  /*
    * This is our fake http endpoint. Our MockDataService will receive mock data from here
      instead of directly accessing the MOCK_DATA constant.
  */
  createDb() {
    const mockData = MOCK_DATA;

    // just so we have a fake endpoint for the specific url
    const submit = mockData.map((obj) => {
      return {
        id: obj.id,
        status: obj.status
      };
    });

    return { mockData, submit };
  }
}
