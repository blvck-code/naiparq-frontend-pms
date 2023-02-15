import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogResponseModel } from '../model/blog.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  // Blog
  fetchBlogs(): Observable<BlogResponseModel> {
    return this.http.get<BlogResponseModel>(env.naiparqBlogList);
  }

  createArticle(blogContent: any): Observable<any> {
    return this.http.post<Observable<any>>(env.naiparqCreateBlog, blogContent);
  }
}
