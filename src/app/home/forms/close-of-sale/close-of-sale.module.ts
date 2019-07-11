import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CloseOfSalePage } from './close-of-sale.page';

const routes: Routes = [
  {
    path: '',
    component: CloseOfSalePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CloseOfSalePage]
})
export class CloseOfSalePageModule {}
