import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriveOutComponent } from './shared/components/drive-out/drive-out.component';
import { OnBoardOneComponent } from './shared/components/drive-out/on-board-one/on-board-one.component';
import { OnBoardTwoComponent } from './shared/components/drive-out/on-board-two/on-board-two.component';
import { OnBoardThreeComponent } from './shared/components/drive-out/on-board-three/on-board-three.component';

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
    path: 'checkout',
    component: DriveOutComponent,
    children: [
      {
        path: '',
        component: OnBoardOneComponent,
      },
      {
        path: 'bill',
        component: OnBoardTwoComponent,
      },
      {
        path: 'confirm',
        component: OnBoardThreeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
