import { Component, OnInit } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
import * as homeActions from '../../../state/home.actions';
import { AppState } from '../../../../app.state';
import { Observable } from 'rxjs';
import { BlogModel } from '../../../model/blog.model';
import { blogList, blogLoaded, blogLoading } from '../../../state/home.reducer';

@Component({
  selector: 'naiparq-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  blogList$: Observable<BlogModel[]> = this.store.select(blogList);
  blogLoading$: Observable<boolean> = this.store.select(blogLoading);
  blogLoaded$: Observable<boolean> = this.store.select(blogLoaded);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
