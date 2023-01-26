import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, RouterModule],
})
export class HomeModule {}
