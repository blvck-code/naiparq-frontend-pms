import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { selectedBlog } from '../../../state/home.reducer';
import { Observable } from 'rxjs';
import { BlogModel } from '../../../model/blog.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  blogSlug: string = '';
  blogDetails$: any;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.routerDetails();
  }

  routerDetails(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogSlug = slug;
      this.store.select(selectedBlog(slug)).subscribe({
        next: (resp) => {
          this.blogDetails$ = resp;
        },
      });
    }
  }

  ngOnInit(): void {}

  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
