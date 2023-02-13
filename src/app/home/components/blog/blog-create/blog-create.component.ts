import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor5} from "@ckeditor/ckeditor5-angular";
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Image from '@ckeditor/ckeditor5-image/src/image';
import {UploadAdapter} from "./UploadAdapter";
import {HttpClient} from "@angular/common/http";
import {UntypedFormBuilder, Validators} from "@angular/forms";
@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {
  loader: any;
  @ViewChild('editor', { static: true }) 'editor': ElementRef;
  // @ts-ignore
  public Editor: CKEditor5.EditorConstructor = ClassicEditor;
  blogContent: any;

  public onReady( eventData: any ) {
    eventData.plugins.get('FileRepository').createUploadAdapter = (loader: any)=> {
      console.log('Loader ==>>', loader)
      return new UploadAdapter(loader, '', this.http);
    };
  }

  blogForm = this.fb.group({
    title: ['', Validators.required],
    cover_image: ['', Validators.required],
    content: ['', Validators.required],
  })

  constructor(
    private http: HttpClient,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log('Content ==>>', this.blogContent)
  }

  upload(loader: any) {
    return loader.file
      .then((file: any) => new Promise( ( resolve, reject ) => {
        var myReader= new FileReader();
        myReader.onloadend = (e) => {
          resolve({ default: myReader.result });
        }

        myReader.readAsDataURL(file);
      } ) );
  };

}

