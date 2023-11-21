import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { AuthGuard } from './Shared/auth.guard';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'risk-score',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // component: RiskScoreComponent,
        loadChildren: () =>
          import('./Pages/risk-score/risk-score.module').then(
            (m) => m.RiskScoreModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'risk-score',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
