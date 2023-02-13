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
import { BlogListComponent } from './components/blog-list/blog-list.component';

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    BlogListComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgxHideOnScrollModule
  ],
})
export class HomeModule {}
