import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const IMAGE_API = 'http://localhost:8080/api/image';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpclient: HttpClient) {
  }

  uploadImageToProfile(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append( 'file', file);

    return this.httpclient.post( IMAGE_API + '/upload', uploadData);
  }

  uploadImageToPost(file: File, postId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append( 'file', file);

    return this.httpclient.post( IMAGE_API + '/' + postId + '/upload', uploadData);
  }

  getUserProfileImage(): Observable<any> {
    return this.httpclient.get( IMAGE_API + '/profileImage');
  }

  getPostImage(postId: number): Observable<any> {
    return this.httpclient.get( IMAGE_API + '/' + postId + '/image');
  }
}
