import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { BlogCreateComponent } from './components/blog/blog-create/blog-create.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { BlogComponent } from './components/blog/blog.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'about-us',
        component: AboutComponent,
      },
      {
        path: 'contact-us',
        component: ContactComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
        children: [
          {
            path: '',
            component: BlogListComponent,
          },
          {
            path: 'create',
            component: BlogCreateComponent,
          },
          {
            path: ':slug',
            component: BlogDetailComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [],
})
export class HomeRoutingModule {}
