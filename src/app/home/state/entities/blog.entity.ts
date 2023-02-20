import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BlogModel } from '../../model/blog.model';

import * as homeActions from '../home.actions';
import { createSelector } from '@ngrx/store';
import { blogStateKey } from '../home.reducer';

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
    default:
      return state;
  }
};

// Selectors

// export const blogLoading = createSelector(
//   blogStateKey,
//   (state) => state.loading
// );
// export const blogLoaded = createSelector(blogStateKey, (state) => state.loaded);
