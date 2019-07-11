import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RidePage } from './ride.page';

// import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: RidePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBh6qGKL1y7b1nXS8EHmL-ITfHTFJPmUps'
    // })
  ],
  declarations: [RidePage]
})
export class RidePageModule {}
