import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriveOutComponent } from './shared/components/drive-out/drive-out.component';
import { BillingComponent } from './shared/components/billing/billing.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
