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
    params = params.append('company_name', 'Naiparq');
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

  contactUs(contactContent: any): Observable<any> {
    return this.http.post(env.naiparqContactUs, contactContent);
  }

  motoristsFAQs: any = [
    {
      id: 1,
      title: 'How do i make a booking request?',
      desc: 'To book a space, simply, follow the below steps;',
      list: [
        'Download the Naiparq app on an Android store (Skip this step if you’ve already downloaded the app).',
        'Sign up for Naiparq via our mobile app or website (Skip this step if you’ve already registered, proceed to the next step).',
        'Open your Naiparq app.',
        'Pinch the map to zoom out.',
        'Move around the map to find the available parking spaces, you should see the blue colored pins.',
        'Click on your desired parking space (blue pin).',
        'Review the price, address, description and features before making your booking request.',
        'Click on the “Make reservation” button.',
        'Select the dates and time duration that you want to book.',
        'Confirm the number plate of the car that will proceed to park.',
        'Your booking request should be responded to within a few minutes.',
        'Wait for the notification that will be sent via SMS and/or email.',
        'Once you have been notified of parking availability, proceed to click on the pay button.',
        'Input your mpesa pin once prompted and the correct amount will be deducted from your mpesa balance.',
        'Wait for the notification that will be sent via SMS and/or email.',
      ],
    },
    {
      id: 2,
      title: 'My booking status says "Declined"',
      desc: 'This means that the parking space may not be available on the date/s you booked.',
    },
    {
      id: 3,
      title: 'I want to reschedule my bookings.',
      desc: 'We don’t generally reschedule bookings but we are willing to make an exception for special cases. Please reach out to our friendly customer success team at info@naiparq.co.ke',
    },
    {
      id: 4,
      title: 'I want to refund my bookings.',
      desc: 'Our Terms of Service state that we generally do not process refunds.',
    },
  ];

  operatorsFAQs: any = [
    {
      id: 5,
      title: 'How do i make a booking request?',
      desc: 'To list your parking space, simply, follow the below steps;',
      list: [
        'Click on the register parking space button.',
        'Provide the requested details.',
        'Wait for a Naiparq representative to reach out to you with the next steps.',
      ],
    },
    {
      id: 6,
      title: 'How do i approve booking requests',
      desc: '',
    },
    {
      id: 7,
      title: 'How much do i have to pay NaiQarq to list my parking space?',
      desc: 'There is currently (the year 2021) no cost to list your own private parking space, or even a whole car park, on naiparq, but this is subject to review with time.',
    },
    {
      id: 8,
      title: 'How do I update the price of my parking space?',
      desc: 'You may update the price of your parking space on the app by reaching out to our friendly customer success team at info@naiparq.co.ke',
    },
  ];
}
