import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './helpers/auth-guard.service';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'login/signin', loadChildren: './login/signin/signin.module#SigninPageModule' },
  { path: 'login/reset', loadChildren: './login/reset/reset.module#ResetPageModule' },
  { 
    path: 'customers/:ref', 
    loadChildren: './customers/customers.module#CustomersPageModule',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'settings', 
    loadChildren: './settings/settings.module#SettingsPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'notifications', 
    loadChildren: './notifications/notifications.module#NotificationsPageModule',
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
