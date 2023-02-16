import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as homeActions from '../../state/home.actions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new homeActions.FetchBlog());
  }
}
