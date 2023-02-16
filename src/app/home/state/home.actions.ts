import { Action } from '@ngrx/store';
import { BlogResponseModel } from '../model/blog.model';

export enum HomeActionsTypes {
  // Blog
  FETCH_BLOGS = 'home/fetchBlog',
  FETCH_BLOGS_SUCCESS = 'home/fetchBlogSuccess',
  FETCH_BLOGS_FAIL = 'home/fetchBlogFail',
}

export class FetchBlog implements Action {
  readonly type = HomeActionsTypes.FETCH_BLOGS;
}

export class FetchBlogSuccess implements Action {
  readonly type = HomeActionsTypes.FETCH_BLOGS_SUCCESS;
  constructor(public payload: BlogResponseModel) {
    console.log('Blog content ===>>>', payload);
  }
}

export class FetchBlogFail implements Action {
  readonly type = HomeActionsTypes.FETCH_BLOGS_FAIL;
  constructor(public payload: any) {
    console.log('Failed blog content ===>>>', payload);
  }
}
