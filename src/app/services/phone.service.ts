import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const PHONE_API = 'http://localhost:8080/api/phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private httpclient: HttpClient) {
  }

  createPhone(phone: any): Observable<any> {
    return this.httpclient.get( PHONE_API + 'create', phone);
  }

  getPhoneById(id: number): Observable<any> {
    return this.httpclient.get( PHONE_API + id);

  }
  getAllPhones(): Observable<any> {
    return this.httpclient.get( PHONE_API + 'all');
  }

  getAllPhonesForUser(): Observable<any> {
    return this.httpclient.get(PHONE_API + 'user/phones');
  }
}
