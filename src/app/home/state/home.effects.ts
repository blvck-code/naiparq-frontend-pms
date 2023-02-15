import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import * as homeActions from './home.actions';
import { HomeService } from '../services/home.service';
import { BlogResponseModel } from '../model/blog.model';

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private homeSrv: HomeService) {}

  loadBlogs$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<homeActions.FetchBlog>(homeActions.HomeActionsTypes.FETCH_BLOGS),
      switchMap((action: homeActions.FetchBlog) =>
        this.homeSrv.fetchBlogs().pipe(
          map(
            (blogResp: BlogResponseModel) =>
              new homeActions.FetchBlogSuccess(blogResp)
          ),
          // @ts-ignore
          catchError((err: any) => {
            console.log('Get blog error ==>>', err);
            return;
          })
        )
      )
    )
  );
}
