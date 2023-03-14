import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './components/dash/dash.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountComponent } from './components/account/account.component';
import { AssetsManagementComponent } from './components/assets-management/assets-management.component';
import { DriveInComponent } from './components/drive-in/drive-in.component';
import { MotoristManagementComponent } from './components/motorist-management/motorist-management.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { PremisesComponent } from './components/premises/premises.component';
import { LogsComponent } from './components/logs/logs.component';
import { RevenuesComponent } from './components/revenues/revenues.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AdminGuard } from '../auth/services/admin.guard';

const dashRoutes: Routes = [
  {
    path: '',
    redirectTo: 'premises',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Todo Add auth guard here AuthGuard
    children: [
      {
        path: '',
        component: DashComponent,
      },
      {
        path: 'premises',
        component: PremisesComponent,
      },
      {
        path: 'logs',
        component: LogsComponent,
      },
      {
        path: 'revenues',
        component: RevenuesComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'drive-in',
        component: DriveInComponent,
      },
      {
        path: 'motorist-management',
        component: MotoristManagementComponent,
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: 'asset-management',
        component: AssetsManagementComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
