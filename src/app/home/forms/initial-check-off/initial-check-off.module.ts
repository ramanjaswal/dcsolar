import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InitialCheckOffPage } from './initial-check-off.page';

const routes: Routes = [
  {
    path: '',
    component: InitialCheckOffPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InitialCheckOffPage]
})
export class InitialCheckOffPageModule {}
