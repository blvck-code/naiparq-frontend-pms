import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [],
})
export class HomeRoutingModule {}
