import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PojoService {

  private endpoint = 'http://localhost:8080/';

  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  get(requestMapping: string): Observable<any> {
    const endpoint = this.endpoint + requestMapping;
    return this.httpClient.get(endpoint);
  }

  getById(requestMapping: string, id: string): Observable<any> {
    const endpoint = this.endpoint + requestMapping + '/' + id;
    return this.httpClient.get(endpoint);
  }

  save(pojo: any, requestMapping: string): Observable<any> {
    const endpoint = this.endpoint + requestMapping;
    return this.httpClient.post(endpoint, pojo);
  }

  update(pojo: any, requestMapping: string): Observable<any> {
    const endpoint = this.endpoint + requestMapping;
    return this.httpClient.put(endpoint, pojo);
  }

  delete(pojo: any, requestMapping: string): Observable<any> {
    const endpoint = this.endpoint + requestMapping;
    const options = {
      header: new HttpHeaders({'Content-Type': 'application/json'}),
      body: pojo,
      observe: 'response' as 'body'
    };
    return this.httpClient.delete(endpoint, options);
  }
}
