import {RouterModule, Routes} from "@angular/router";
import {DashComponent} from "./components/dash/dash.component";
import {DashboardComponent} from "./dashboard.component";
import {NgModule} from "@angular/core";
import {AnalyticsComponent} from "./components/analytics/analytics.component";


const dashRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [], // Todo Add auth guard here
    children:[
      {
        path: '',
        component: DashComponent
      },
      {
        path: 'cash-payment',
        component: AnalyticsComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(dashRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
