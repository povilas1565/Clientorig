import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const VIDEO_API = 'http://localhost:8080/api/video';
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpclient: HttpClient) {
  }

  uploadVidToProfile(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append( 'file', file);

    return this.httpclient.post( VIDEO_API + '/upload', uploadData);
  }

  uploadVidToPost(file: File, postId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.httpclient.post( VIDEO_API + '/' + postId + '/upload', uploadData);
  }

  getUserProfileVid(): Observable<any> {
    return this.httpclient.get( VIDEO_API + '/profileVideo');
  }

  getPostVid(postId: number): Observable<any> {
    return this.httpclient.get( VIDEO_API + '/' + postId + '/video');
  }
}

