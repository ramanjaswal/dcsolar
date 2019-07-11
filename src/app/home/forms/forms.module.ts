import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormsPage } from './forms.page';
import { PopoverComponent } from './popover/popover.component';

import { ReactiveFormsModule } from '@angular/forms';

import { PvSiteVisitPage } from './pv-site-visit/pv-site-visit.page';
import { FinalCheckOffPage } from './final-check-off/final-check-off.page';
import { InitialCheckOffPage } from './initial-check-off/initial-check-off.page';
import { PrePvSitePage } from './pre-pv-site/pre-pv-site.page';
import { CloseOfSalePage } from './close-of-sale/close-of-sale.page';
import { CustomerReferralPage } from './customer-referral/customer-referral.page';

const routes: Routes = [
  {
    path: '',
    component: FormsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    FormsPage,
    PopoverComponent,
    PvSiteVisitPage,
    FinalCheckOffPage,
    InitialCheckOffPage,
    PrePvSitePage,
    CloseOfSalePage,
    CustomerReferralPage
  ],
  entryComponents: [
    PopoverComponent,
    PvSiteVisitPage,
    FinalCheckOffPage,
    InitialCheckOffPage,
    PrePvSitePage,
    CloseOfSalePage,
    CustomerReferralPage
  ],
})
export class FormsPageModule {}
