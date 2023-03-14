import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { selectedBlog } from '../../../state/home.reducer';
import { userInfo } from '../../../../auth/state/auth.selector';
import { HomeService } from '../../../services/home.service';
import { SharedService } from '../../../../shared/services/shared.service';

// NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import * as homeActions from '../../../state/home.actions';
import { Observable } from 'rxjs';
import { BlogModel } from '../../../model/blog.model';

@Component({
  selector: 'naiparq-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  blogSlug: string = '';
  blogDetails$!: Observable<any>;
  deletingBlog: boolean = false;
  @ViewChild('closeDeleteBlog') 'closeDeleteBlog': ElementRef;

  constructor(
    private homeSrv: HomeService,
    private sharedSrv: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.routerDetails();
  }

  routerDetails(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogSlug = slug;
      this.blogDetails$ = this.store.select(selectedBlog(slug));
      // this.store.select(selectedBlog(slug)).subscribe({
      //   next: (resp) => {
      //     this.blogDetails$ = resp;
      //   },
      // });
    }
  }

  ngOnInit(): void {}

  editRights(): boolean {
    let userType: string = '';
    let superUser: boolean | undefined = false;

    this.store.select(userInfo).subscribe({
      next: (userDetails) => {
        userType = userDetails.user_type;
        superUser = userDetails.is_superuser;
      },
    });
    if (userType === 'blogger' || superUser) {
      return true;
    }
    return false;
  }

  numSeq(n: number): Array<number> {
    return Array(n);
  }

  selectedBlog(): any {
    let blogId: string = '';

    this.blogDetails$.subscribe({
      next: (blog) => {
        if (blog) {
          blogId = blog?.id;
        }
      },
    });

    this.store.dispatch(new homeActions.SelectedBlog(blogId));
    const editURL = `/blog/create/${blogId}`;
    return this.router.navigate([editURL]);
  }

  deleteBlog(): void {
    let blogSlug: string = '';
    let blogId: string = '';

    this.blogDetails$.subscribe({
      next: (blog) => {
        if (blog) {
          blogSlug = blog.slug;
          blogId = blog.id;
        }
      },
    });

    this.deletingBlog = true;
    console.log('Blog id ==>>', blogSlug);
    this.homeSrv.deleteBlog(blogSlug).subscribe({
      next: (response) => {
        this.deletingBlog = false;
        this.closeDeleteBlog.nativeElement.click();
        //  Remove from store
        this.sharedSrv.showNotification(
          'Blog deleted successfully.',
          'success'
        );
        this.store.dispatch(new homeActions.DeleteBlog(blogId));
        this.router.navigate(['/blog']);
      },
      error: (error: { detail: string }) => {
        this.deletingBlog = false;
        this.closeDeleteBlog.nativeElement.click();
        this.sharedSrv.showNotification(
          'Failed to delete blog, please try again.',
          'error'
        );
        console.log('Delete failed ==>>', error);
      },
    });

    // delete
    // show delete success message
    // remove from store
    // redirect to blog list page
  }
}
