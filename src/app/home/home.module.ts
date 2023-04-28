import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { BlogCreateComponent } from './components/blog/blog-create/blog-create.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ShowdownModule } from 'ngx-showdown';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './state/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './state/home.effects';
import { SharedModule } from '../shared/shared.module';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BlogComponent } from './components/blog/blog.component';
import { PmsComponent } from './components/products/pms/pms.component';
import { ReservationComponent } from './components/products/reservation/reservation.component';
import { CarouselComponent } from './components/landing/carousel/carousel.component';

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    BlogListComponent,
    BlogCreateComponent,
    BlogDetailComponent,
    BlogComponent,
    PmsComponent,
    ReservationComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    CKEditorModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    ShowdownModule.forRoot({ emoji: true, noHeaderId: true, flavor: 'github' }),
    FormsModule,
    SharedModule,
    NgxSkeletonLoaderModule.forRoot({
      theme: {
        width: '100%',
      },
    }),
  ],
})
export class HomeModule {}
