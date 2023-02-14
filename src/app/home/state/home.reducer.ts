import { BlogModel } from '../model/blog.model';

export interface HomeState {
  blog: {
    loaded: boolean;
    next: string;
    articles: BlogModel[];
  };
}

const initialState: HomeState = {
  blog: {
    loaded: false,
    next: '',
    articles: [],
  },
};

export const homeReducer = (state = initialState, action: any): HomeState => {
  switch (action.type) {
    default:
      return state;
  }
};
