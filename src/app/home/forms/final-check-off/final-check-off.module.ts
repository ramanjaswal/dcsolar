import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FinalCheckOffPage } from './final-check-off.page';

const routes: Routes = [
  {
    path: '',
    component: FinalCheckOffPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FinalCheckOffPage]
})
export class FinalCheckOffPageModule {}
