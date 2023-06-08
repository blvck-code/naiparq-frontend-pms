import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogResponseModel } from '../model/blog.model';
import { CompanyModel, CompanyResponseModel } from '../model/company.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  scrollY = new BehaviorSubject(0);
  scrollY$ = this.scrollY.asObservable();

  updateScrollY(value: number): void {
    this.scrollY.next(value);
  }

  // Blog
  fetchBlogs(): Observable<BlogResponseModel> {
    let params = new HttpParams();
    params = params.append('company_name', 'naiparq');
    return this.http.get<BlogResponseModel>(env.naiparqBlogList, {
      params: params,
    });
  }

  createArticle(blogContent: any): Observable<any> {
    return this.http.post<Observable<any>>(env.naiparqCreateBlog, blogContent);
  }

  companyList(): Observable<CompanyResponseModel> {
    return this.http.get<CompanyResponseModel>(env.naiparqCompanyList);
  }

  deleteBlog(
    blogSlug: string
  ): Observable<{ message: string; status: number }> {
    const deleteURL: string = `${env.naiparqBlogList}/${blogSlug}/`;
    return this.http.delete<{ message: string; status: number }>(deleteURL);
  }
}
