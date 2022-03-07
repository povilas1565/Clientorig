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

  uploadVideoToProfile(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append( 'file', file);

    return this.httpclient.post( VIDEO_API + '/upload', uploadData);
  }

  uploadVideoToPost(file: File, postId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append( 'file', file);

    return this.httpclient.post( VIDEO_API + '/' + postId + '/upload', uploadData);
  }

  getUserProfileVideo(): Observable<any> {
    return this.httpclient.get( VIDEO_API + '/profileVideo');
  }

  getPostVideo(postId: number): Observable<any> {
    return this.httpclient.get( VIDEO_API + '/' + postId + '/video');
  }
}

