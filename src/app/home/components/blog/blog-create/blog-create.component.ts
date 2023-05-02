import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UploadAdapter } from './UploadAdapter';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../../../services/home.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { BlogModel } from '../../../model/blog.model';
import { Router } from '@angular/router';
import { isLoggedIn, userInfo } from '../../../../auth/state/auth.selector';

// NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import * as homeActions from '../../../state/home.actions';
import { selectedBlog, selectedBlogId } from '../../../state/home.reducer';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'naiparq-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
})
export class BlogCreateComponent implements OnInit {
  loader: any;
  @ViewChild('editor', { static: true }) 'editor': ElementRef;
  @ViewChild('coverImgInput', { static: true }) 'coverImgInput': ElementRef;
  // @ts-ignore
  public Editor = DecoupledEditor;
  blogFormData = new FormData();
  blogContent: any;

  submitting: boolean = false;

  preview: boolean = false;

  coverImage: string = '';
  coverImageName: string = '';

  public onReady(editor: any) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  blogForm = this.fb.group({
    title: ['', Validators.required],
    cover_image: ['', Validators.required],
    content: ['', Validators.required],
  });

  constructor(
    private http: HttpClient,
    private fb: UntypedFormBuilder,
    private homeSrv: HomeService,
    private sharedSrv: SharedService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.editMode();
  }

  editMode(): void {
    this.store.select(selectedBlogId).subscribe({
      next: (blogId: string) => {
        if (!blogId) {
          return;
        }
        console.log('Selected blog id ==>>', blogId);
        // find blog from store
        this.store.select(selectedBlog(blogId)).subscribe({
          next: (blogItem) => {
            this.patchFormValues(blogItem);
          },
        });
        // patch form values
      },
    });
  }

  patchFormValues(blog: any): void {
    this.blogForm.patchValue({
      title: blog.title,
    });
    this.coverImage = blog.cover_img;
    this.blogContent = blog.content;
    console.log('Blog to edit ==>>', blog);
  }

  clickCoverImg(): void {
    this.coverImgInput.nativeElement.click();
  }

  togglePreview(): any {
    this.preview = !this.preview;
  }

  inputCoverImg(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const formData = new FormData();
      this.coverImageName = event.target.files[0].name;

      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (event) => {
        // Show image base64 content to the screen
        // @ts-ignore
        this.coverImage = event.target.result;
      };

      formData.append('cover_image', event);
      this.blogFormData.append('cover_image', event.target.files[0]);
    } else {
      this.sharedSrv.showNotification(
        'Could not upload cover image, please try again.',
        'error'
      );
    }
  }

  resetCoverImg(): void {}

  onSubmit(): void {
    // Check if in edit blog mode or create new blog mode

    this.submitting = true;
    this.blogFormData.append('title', this.blogForm.get('title')?.value);
    this.blogFormData.append('content', this.blogContent);

    this.homeSrv.createArticle(this.blogFormData).subscribe({
      next: (response: BlogModel) => {
        console.log('Create blog response ==>>', response);
        // Todo 1: add article to store
        // Todo 2: redirect to blog detail page
        this.submitting = false;
        this.sharedSrv.showNotification('Blog created successfully', 'success');
        this.store.dispatch(new homeActions.CreateBlogSuccess(response));
        setTimeout(() => {
          this.router.navigate([`blog/${response.id}`]);
        }, 2000);
      },
      error: (err) => {
        console.log('Failed create blog ==>>', err);
        this.submitting = false;
        this.sharedSrv.showNotification('Failed to create blog.', 'error');
      },
    });
  }

  upload(loader: any) {
    return loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          var myReader = new FileReader();
          myReader.onloadend = (e) => {
            resolve({ default: myReader.result });
          };

          myReader.readAsDataURL(file);
        })
    );
  }
}
