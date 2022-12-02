import {RouterModule, Routes} from "@angular/router";
import {DashComponent} from "./components/dash/dash.component";
import {DashboardComponent} from "./dashboard.component";
import {NgModule} from "@angular/core";
import {SettingsComponent} from "./components/settings/settings.component";
import {AccountComponent} from "./components/account/account.component";
import {AssetsManagementComponent} from "./components/assets-management/assets-management.component";
import {CashPaymentComponent} from "./components/cash-payment/cash-payment.component";
import {MotoristManagementComponent} from "./components/motorist-management/motorist-management.component";
import {NotificationsComponent} from "./components/notifications/notifications.component";
import {AuthGuard} from "../auth/services/auth.guard";


const dashRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Todo Add auth guard here AuthGuard
    children:[
      {
        path: '',
        component: DashComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'cash-payment',
        component: CashPaymentComponent
      },
      {
        path: 'motorist-management',
        component: MotoristManagementComponent
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'asset-management',
        component: AssetsManagementComponent
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(dashRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
