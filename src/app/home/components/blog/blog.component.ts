import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as homeActions from '../../state/home.actions';
import { Observable } from 'rxjs';
import { blogLoaded } from '../../state/home.reducer';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  blogLoaded$: Observable<boolean> = this.store.select(blogLoaded);

  ngOnInit(): void {
    this.blogLoaded$.subscribe({
      next: (status) => {
        if (status) return;
        this.store.dispatch(new homeActions.FetchBlog());
      },
    });
  }
}
