import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Events  } from '@ionic/angular';
import { ProfilePage } from '../../profile/profile.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import { Label } from 'ng2-charts';

import { Chart } from 'chart.js';

// import { UserService } from '../../api/user.service';
import { ClockinService } from '../../api/clockin.service';
import { CustomersService } from '../../api/customers.service';
// import { LoadingService } from '../../helpers/loading.service';
import { MessageService } from '../../helpers/message.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-clockin',
  templateUrl: './clockin.page.html',
  styleUrls: ['./clockin.page.scss'],
})
export class ClockinPage implements OnInit {

  tracking : Boolean = false;

  barChart: any;
  pieChart: any;
  user: any = {
    // avatar: "/assets/avatar.png"
  };
  showAvatar: Boolean = false;
  activeTab: string = "";
  form: any = {};

  today: any = { 
    hours: '00',
    mins: '00',
    secs: '00'
  }
  week: any = { 
    hours: '00',
    mins: '00'
  }
  month: any = { 
    hours: '00',
    mins: '00'
  }

  dataLoaded: Boolean = false;
  showCharts: Boolean = false;

  barChartData: any = {};
  pieChartData: any = {};
  customers:any = [];

  selectedCustomer: any;

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('pieCanvas') pieCanvas;

  // tracker: any;

  constructor(
    public modalController: ModalController,
    private statusBar: StatusBar,
    // private userService: UserService,
    // private loading: LoadingService,
    private clockinService: ClockinService,
    private messageService: MessageService,
    private customerService: CustomersService,
    private storage: Storage,
    private events: Events) { }

  ngOnInit() {
    this.handleEvents();
  }

  ngOnDestroy() {
     //clear interval
    console.log("clock in view: destroyed")
    this.stopTicker();

  }

  ionViewWillEnter(){

    this.getUser();
    console.log("clock in view: enter");

    // this.getAllCustomers();

    this.getTracker().then( () => {
      console.log("get time promise success")
      this.startTicker(); //start time tracker
    } )
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString("#f4f4f4");
    this.getChartsData();
  }

  ionViewDidLeave(){
    console.log("clock in view: leave");
    this.stopTicker(); //stop time tracker
  }

  handleEvents(){
    this.events.subscribe( 'customer:selected:clockin', (customer) => {
      this.form.customer = customer.ac_id;
      this.selectedCustomer = customer;
      console.log("Customer selected event: clockin");
    } )
  }

  startTicker(){
    console.log("called: startTicker()")
    let _secs = parseInt( this.today.secs );

    if( this.tracking ){

      setTimeout( () => {
        this.getTracker();
        let ticker_id = setInterval( () => {
          this.getTracker();
        }, 1000 * 60); 

        this.storage.set( 'ticker_id', ticker_id );
        console.log("interval started: ", ticker_id);

      }, 1000  * (60 - _secs)) ; 
    }

  }

  stopTicker(){

    this.storage.get( 'ticker_id' ).then( val => {
      console.log('interval id: ', val);
      if( val !== null ){
        clearInterval( val );
        console.log("interval cleared");
      }
    } );

  }
  
  getChartsData(){

    return new Promise( resolve => {

      this.clockinService.getChartsData().subscribe( res => {

        if( res.status === true ){
          this.barChartData = res.bar;
          this.pieChartData = res.pie;
  
            this.showCharts = true;
            setTimeout( () => {
              this.initializeBarChart();
              this.initializePieChart();
            })

            resolve(true);
  
        }
  
      } );

    } )
  }

  getTracker(){
    console.log("called: getTracker()")
    return new Promise( resolve => {
      this.clockinService.getTracker().subscribe( res => {

        this.dataLoaded = true;

        this.tracking = res.data.running;
  
        if( res.data.running && res.data.comment )
          this.form.comment = res.data.comment;
  
        if( res.data.running && res.data.customer )
          this.form.customer = res.data.customer;
  
        let _today = ["00","00","00"];
        let _week  = ["00","00","00"];
        let _month = ["00","00","00"];

        if(res.data.today !== null)
          _today = res.data.today.split(":");

        if(res.data.week !== null)
          _week = res.data.week.split(":");

        if(res.data.month !== null)
          _month = res.data.month.split(":");
  
        this.today.hours = _today[0];
        this.today.mins = _today[1];
        this.today.secs = _today[2];
  
        this.week.hours = _week[0];
        this.week.mins = _week[1];
  
        this.month.hours = _month[0];
        this.month.mins = _month[1];

        resolve(true);
        
      } )
    } )
    
  }

  getUser(){
    let _user = window.localStorage.getItem('user');
    if( _user !== null ){
      this.user = JSON.parse( _user );
    }
  }

  // getAllCustomers(){

  //   this.customerService.getAllCustomers().subscribe( res => {
  //     this.customers = res.data;
  //   } )

  // }

  tabChanged( event ){
    this.activeTab = event.target.value;
  }

  startClock(){

    if( !this.form.customer ){
      this.messageService.notice("Select a customer");
      return false;
    }

    if( !this.form.comment ){
      this.messageService.notice("Enter your comment");
      return false;
    }

    this.clockinService.clockIn( this.form ).subscribe( res => {
      if( res.status === true ){
        //this.storage.set('clock_id', res.id);
        this.messageService.success( res.message );
        this.tracking = true;
        this.startTicker();
      }
    } )
  }

  stopClock(){
    //let clock_id = await this.storage.get('clock_id');
    this.clockinService.clockOut().subscribe( res => {
      if( res.status === true ){
        this.messageService.success(res.message);
        //this.storage.remove('clock_id');

        this.tracking = false;
        //stop tracker if running
        this.stopTicker();

        this.getChartsData(); //update charts when stooped

      }
    } )
  }

  initializePieChart(){

    let dataArr=[0, 0]; //[work, break]

    if( this.pieChartData && this.pieChartData.work ){

      let _time = this.pieChartData.work.split(":");
      let total_hours = parseInt( _time[0] ) + ( parseInt( _time[1] ) / 60 ) + ( parseInt( _time[2] ) / (60 * 60) ) ;
      total_hours = parseFloat( total_hours.toFixed(2) );

      dataArr[0] = total_hours;

    }

    if( this.pieChartData && this.pieChartData.break ){

      let _time = this.pieChartData.break.split(":");
      let total_hours = parseInt( _time[0] ) + ( parseInt( _time[1] ) / 60 ) + ( parseInt( _time[2] ) / (60 * 60) ) ;
      total_hours = parseFloat( total_hours.toFixed(2) );

      dataArr[1] = total_hours;

    }

    if ( dataArr[0] == 0 && dataArr[1] == 0 ){
      dataArr[1] = 0.01;
    }

    
    this.pieChart = new Chart( this.pieCanvas.nativeElement, {

      type: 'pie',
      data: {
          labels: ["Customer Work", "Break"],
          datasets: [{
              label: '',
              data: dataArr,
              backgroundColor: [
                  //'#9B9BFF',
                  '#EFB725',
                  '#C3C3C3'
              ],
              borderWidth: 0
          }]
      },
      options: {
          legend: {
            display: false
          }
      }

    } )

  }

  initializeBarChart(){

    let dataArr = [0,0,0,0,0,0,0];

    if( this.barChartData && this.barChartData.length > 0 ){
      this.barChartData.forEach( data => {
        
        let _time = data.time.split(":");
        let total_hours = parseInt( _time[0] ) + ( parseInt( _time[1] ) / 60 ) + ( parseInt( _time[2] ) / (60 * 60) ) ;
        total_hours = parseFloat( total_hours.toFixed(2) );

        dataArr[ parseInt(data.day) ] = total_hours;

      });
    }

    this.barChart = new Chart( this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
            datasets: [{
                label: '',
                data: dataArr,
                backgroundColor: [
                    '#EFB725',
                    '#C3C3C3',
                    '#EFB725',
                    '#C3C3C3',
                    '#EFB725',
                    '#C3C3C3',
                    '#EFB725'
                ],
                borderWidth: 0
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
                            return value + 'h';
                        }
                    }
                }]
            }
        }
    });
  }

  workHours(){
      let _time = this.pieChartData.work.split(":");
      return _time[0] + ":" + _time[1] + " hrs";
  }

  breakHours(){
      let _time = this.pieChartData.break.split(":");
      return _time[0] + ":" + _time[1] + " hrs";
  }

  async presentProfileModal() {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  doRefresh(event){
    this.dataLoaded = false;
    this.showCharts = false;
    this.getChartsData().then( () => {
      event.target.complete();
    } )
    this.getTracker();
    // this.getAllCustomers();
  }

}
