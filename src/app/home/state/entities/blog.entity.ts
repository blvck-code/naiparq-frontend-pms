import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BlogModel } from '../../model/blog.model';

import * as homeActions from '../home.actions';
import { createSelector } from '@ngrx/store';
import { blogStateKey } from '../home.reducer';
import { act } from '@ngrx/effects';

export interface BlogEntity extends EntityState<BlogModel> {
  selectedBlogId: string;
  loading: boolean;
  loaded: boolean;
}

export const blogAdapter: EntityAdapter<BlogModel> =
  createEntityAdapter<BlogModel>();

export const defaultBlog: BlogEntity = {
  ids: [],
  entities: {},
  selectedBlogId: '',
  loading: false,
  loaded: false,
};

export const initialState = blogAdapter.getInitialState(defaultBlog);

export const blogReducer = (state = initialState, action: any): BlogEntity => {
  switch (action.type) {
    // New Blog
    case homeActions.HomeActionsTypes.CREATE_BLOG_SUCCESS:
      return blogAdapter.addOne(action.payload, {
        ...state,
      });
    // Fetch Blogs
    case homeActions.HomeActionsTypes.FETCH_BLOGS:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case homeActions.HomeActionsTypes.FETCH_BLOGS_SUCCESS:
      return blogAdapter.addMany(action.payload.results, {
        ...state,
        loaded: true,
        loading: false,
      });
    // Delete Blog
    case homeActions.HomeActionsTypes.DELETE_BLOG:
      return blogAdapter.removeOne(action.payload, {
        ...state,
      });
    // Selected Blog
    case homeActions.HomeActionsTypes.SELECTED_BLOG:
      console.log('Selected blog id ==>>', action.payload);
      return {
        ...state,
        selectedBlogId: action.payload,
      };
    default:
      return state;
  }
};
