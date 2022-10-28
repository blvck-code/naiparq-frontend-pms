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



@NgModule({
  declarations: [
    PremisesComponent,
    LogsComponent,
    RevenuesComponent,
    AnalyticsComponent,
    AssetsManagementComponent,
    UserManagementComponent,
    AccountComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
