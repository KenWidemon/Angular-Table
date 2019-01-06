import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // no need to import in AppModule
})
export class MockDataService {

  private mockDataUrl = 'api/mockData';
  private submitUrl = 'api/submit';

  constructor(private http: HttpClient) {}

  getData(): Promise<any[]> {
    // this will reach our fake http endpoint
    return this.http.get<any[]>(this.mockDataUrl).toPromise();
  }

  getColumns(data: any): string[] {
    return Object.keys(data); // just set columns equal to first row's keys
  }

  postStatus(request: any): Observable<any> {
    // this will reach our fake http endpoint and send back a JSON object with id and status
    return this.http.post<any>(this.submitUrl, request);
  }
}
