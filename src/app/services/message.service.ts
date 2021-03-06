import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const MESSAGE_API = 'http://localhost:8080/api/message/';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpclient: HttpClient) {
  }

  createMessage(message: any): Observable<any> {
    return this.httpclient.post(MESSAGE_API + 'create', message);
  }

  getAllMessages(): Observable<any> {
    return this.httpclient.get(MESSAGE_API + 'all');
  }

  getMessagesForCurrentUser(): Observable<any> {
    return this.httpclient.get(MESSAGE_API + 'user/messages');
  }

  deleteMessage(id: number): Observable<any> {
    return this.httpclient.get(MESSAGE_API + id + '/delete', null);
  }
}
