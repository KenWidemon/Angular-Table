import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // no need to import in Providers[] in AppModule
})
export class MockDataService {

  private mockDataUrl = 'api/mockData';

  constructor(private http: HttpClient) {}

  getData(): Promise<any[]> {
    // this will reach our fake http endpoint
    return this.http.get<any[]>(this.mockDataUrl).toPromise();
  }

  getColumns(data: any): string[] {
    return Object.keys(data); // just set columns equal to first row's keys
  }

  postStatus(request: any): Observable<any> {
    return this.http.post<any>(this.mockDataUrl, request); // no data is actually returned; this is just a simulation
  }
}
