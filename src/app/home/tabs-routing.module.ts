import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

import { AuthGuardService as AuthGuard } from '../helpers/auth-guard.service';

import { AuthService } from '../helpers/auth.service';

const auth = new AuthService();

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children:
      [
        {
          path: 'clockin',
          canActivate: [AuthGuard],
          children:
            [
              {
                path: '',
                loadChildren: './clockin/clockin.module#ClockinPageModule'
              }
            ]
        },
        {
          path: 'mileage',
          canActivate: [AuthGuard],
          children:
            [
              {
                path: '',
                loadChildren: './mileage/mileage.module#MileagePageModule'
              }
            ]
        },
        {
          path: 'forms',
          canActivate: [AuthGuard],
          children:
            [
              {
                path: '',
                loadChildren: './forms/forms.module#FormsPageModule'
              }
            ]
        },
        {
          path: 'inventory',
          canActivate: [AuthGuard],
          children:
            [
              {
                path: '',
                loadChildren: './inventory/inventory.module#InventoryPageModule'
              }
            ]
        },
        {
          path: 'calendar',
          canActivate: [AuthGuard],
          children:
            [
              {
                path: '',
                loadChildren: './calendar/calendar.module#CalendarPageModule'
              }
            ]
        },
        {
          path: '',
          redirectTo: '/home/clockin',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: auth.isAuthenticated() ? '/home/clockin' : '/login',
    pathMatch: 'full'
  },
  { 
    path: 'home/calendar/details', 
    loadChildren: './calendar/details/details.module#DetailsPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'home/calendar/add', 
    loadChildren: './calendar/add/add.module#AddPageModule',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'home/calendar/duration', 
    loadChildren: './calendar/duration/duration.module#DurationPageModule',
    canActivate: [AuthGuard] 
  },

];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class TabsPageRoutingModule {}