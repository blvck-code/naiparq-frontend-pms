import { Action } from '@ngrx/store';
import { BlogModel, BlogResponseModel } from '../model/blog.model';
import { CompanyResponseModel } from '../model/company.model';

export enum HomeActionsTypes {
  // Blog
  FETCH_BLOGS = 'blog/fetchBlog',
  FETCH_BLOGS_SUCCESS = 'blog/fetchBlogSuccess',
  FETCH_BLOGS_FAIL = 'blog/fetchBlogFail',

  // Create blog
  CREATE_BLOG = 'blog/createBlog',
  CREATE_BLOG_SUCCESS = 'blog/createBlogSuccess',
  CREATE_BLOG_FAIL = 'blog/createBlogFail',

  // Delete Blog
  DELETE_BLOG = 'blog/deleteBlog',

  // Selected Blog
  SELECTED_BLOG = 'blog/selectedBlog',

  //
  LOAD_FIRMS = 'blog/loadFirms',
  LOAD_FIRMS_SUCCESS = 'blog/loadFirmsSuccess',
  LOAD_FIRMS_FAIL = 'blog/loadFirmsFail',
}

// Create blog
export class CreateBlog implements Action {
  readonly type = HomeActionsTypes.CREATE_BLOG;
}
export class CreateBlogSuccess implements Action {
  readonly type = HomeActionsTypes.CREATE_BLOG_SUCCESS;
  constructor(public payload: BlogModel) {
    console.log('Create blog success ===>>', payload);
  }
}
export class CreateBlogFail implements Action {
  readonly type = HomeActionsTypes.CREATE_BLOG_FAIL;
  constructor(public payload: any) {
    console.log('Create blog failed ==>>', payload);
  }
}

// Delete Blog
export class DeleteBlog implements Action {
  readonly type = HomeActionsTypes.DELETE_BLOG;
  constructor(public payload: string) {}
}

// Selected Blog
export class SelectedBlog implements Action {
  readonly type = HomeActionsTypes.SELECTED_BLOG;
  constructor(public payload: string) {}
}

// Blog list
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

// Load firms
export class LoadFirms implements Action {
  readonly type = HomeActionsTypes.LOAD_FIRMS;
}
export class LoadFirmsSuccess implements Action {
  readonly type = HomeActionsTypes.LOAD_FIRMS_SUCCESS;
  constructor(public payload: CompanyResponseModel) {}
}
export class LoadFirmsFails implements Action {
  readonly type = HomeActionsTypes.LOAD_FIRMS_FAIL;
  constructor(public payload: any) {}
}
