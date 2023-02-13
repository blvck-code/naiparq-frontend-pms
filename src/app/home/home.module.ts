import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxHideOnScrollModule} from "ngx-hide-on-scroll";
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { BlogCreateComponent } from './components/blog/blog-create/blog-create.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ShowdownModule} from "ngx-showdown";

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    BlogListComponent,
    BlogCreateComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgxHideOnScrollModule,
    CKEditorModule,
    ShowdownModule.forRoot({emoji: true, noHeaderId: true, flavor: 'github'}),
    FormsModule,
  ],
})
export class HomeModule {}
