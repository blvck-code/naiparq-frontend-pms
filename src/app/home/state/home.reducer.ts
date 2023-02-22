import { BlogModel } from '../model/blog.model';

import * as fromBlogEnt from './entities/blog.entity';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { blogAdapter } from './entities/blog.entity';

export interface HomeState {
  blog: fromBlogEnt.BlogEntity;
}

export const homeReducer: ActionReducerMap<HomeState> = {
  blog: fromBlogEnt.blogReducer,
};

// Selectors
export const home = 'home';

export const homeStateKey = createFeatureSelector<HomeState>(home);

export const blogStateKey = createSelector(homeStateKey, (state) => state.blog);

export const blogList = createSelector(
  blogStateKey,
  blogAdapter.getSelectors().selectAll
);
export const blogLoading = createSelector(
  blogStateKey,
  (state) => state.loading
);
export const blogLoaded = createSelector(blogStateKey, (state) => state.loaded);

export const blogEntities = createSelector(
  blogStateKey,
  blogAdapter.getSelectors().selectEntities
);

export const selectedBlog = (slug: string) =>
  createSelector(blogEntities, (blogList) => blogList[slug]);
export const selectedBlogId = createSelector(
  blogStateKey,
  (state) => state.selectedBlogId
);
