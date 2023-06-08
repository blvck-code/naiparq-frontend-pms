import { BlogModel } from '../model/blog.model';

import * as fromBlogEnt from './entities/blog.entity';
import * as fromCompany from './entities/company.entity';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { blogAdapter } from './entities/blog.entity';

export interface HomeState {
  blog: fromBlogEnt.BlogEntity;
  firms: fromCompany.CompanyState;
}

export const homeReducer: ActionReducerMap<HomeState> = {
  blog: fromBlogEnt.blogReducer,
  firms: fromCompany.companyEntity,
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

export const firmStateKey = createSelector(
  homeStateKey,
  (state) => state.firms
);

export const firmsLoaded = createSelector(
  firmStateKey,
  (state) => state.loaded
);
export const firms = createSelector(firmStateKey, (state) => state.companies);
export const firmsError = createSelector(firmStateKey, (state) => state.error);
