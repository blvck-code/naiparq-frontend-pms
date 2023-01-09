import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremisesComponent } from './components/premises/premises.component';
import { LogsComponent } from './components/logs/logs.component';
import { RevenuesComponent } from './components/revenues/revenues.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AssetsManagementComponent } from './components/assets-management/assets-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AccountComponent } from './components/account/account.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashComponent } from './components/dash/dash.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DriveInComponent } from './components/drive-in/drive-in.component';
import { MotoristManagementComponent } from './components/motorist-management/motorist-management.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IgxLegendModule,
  IgxCategoryChartModule,
  IgxDataChartInteractivityModule,
} from 'igniteui-angular-charts';

@NgModule({
  declarations: [
    PremisesComponent,
    LogsComponent,
    RevenuesComponent,
    AnalyticsComponent,
    AssetsManagementComponent,
    UserManagementComponent,
    AccountComponent,
    SettingsComponent,
    DashComponent,
    DashboardComponent,
    DriveInComponent,
    MotoristManagementComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    IgxLegendModule,
    IgxCategoryChartModule,
    IgxDataChartInteractivityModule,
  ],
})
export class DashboardModule {}
