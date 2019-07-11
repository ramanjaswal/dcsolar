import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PvSiteVisitPage } from './pv-site-visit.page';

const routes: Routes = [
  {
    path: '',
    component: PvSiteVisitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PvSiteVisitPage]
})
export class PvSiteVisitPageModule {}
