import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // no need to import in Providers[] in AppModule
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
    // this doesn't return any data; this is just a simulation
    return this.http.post<any>(this.submitUrl, request)
      .pipe(
        // look at the values and use them to alert the user
        tap(_ => alert('You have successfully posted a status of "' + (request.status).toUpperCase() + '" for Row ID: ' + request.id))
      );
  }
}
