import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  createArticle(blogContent: any): Observable<any> {
    return this.http.post<Observable<any>>(env.naiparqCreateBlog, blogContent);
  }
}
