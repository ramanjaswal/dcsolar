import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController  } from '@ionic/angular';
import { ProfilePage } from '../../profile/profile.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { RidePage } from './ride/ride.page';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-mileage',
  templateUrl: './mileage.page.html',
  styleUrls: ['./mileage.page.scss'],
})
export class MileagePage implements OnInit {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  user: any = {
    avatar: "/assets/avatar.png"
  };

  constructor(
    public modalController: ModalController,
    private statusBar: StatusBar) { }

  ngOnInit() {
    this.initLineChart();
  }

  ionViewWillEnter(){
    this.getUser();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString("#ffffff");
  }

  getUser(){
    let _user = window.localStorage.getItem('user');
    if( _user !== null ){
      this.user = JSON.parse( _user );
    }
  }

  initLineChart(){

     this.lineChart = new Chart( this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: '',
                data: [1, 3, 2.5, 4, 0.5, 0.5, 0.5],
                backgroundColor: '#EFB725',
                fill: false,
                pointRadius: 5,
                borderColor: '#EFB725',
                borderWidth: 3
            }]
        },
        options: {
            legend: {
              display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '';
                        }
                    }
                }]
            }
        }
     })

  }

  tabChanged(){
    
  }

  async addRide(){
    const modal = await this.modalController.create({
      component: RidePage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  async presentProfileModal() {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

}
