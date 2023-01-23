import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriveOutComponent } from './shared/components/drive-out/drive-out.component';
import { BillingComponent } from './shared/components/billing/billing.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'drive-out',
    component: DriveOutComponent,
  },
  {
    path: 'drive-out/:driveOutSlug',
    component: BillingComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
