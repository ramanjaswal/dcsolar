import { Component, OnInit } from '@angular/core';
import { ModalController, Events  } from '@ionic/angular';
import { ProfilePage } from '../../profile/profile.page';

import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

import { PvSiteVisitPage } from './pv-site-visit/pv-site-visit.page';
import { FinalCheckOffPage } from './final-check-off/final-check-off.page';
import { InitialCheckOffPage } from './initial-check-off/initial-check-off.page';
import { PrePvSitePage } from './pre-pv-site/pre-pv-site.page';
import { CloseOfSalePage } from './close-of-sale/close-of-sale.page';
import { CustomerReferralPage } from './customer-referral/customer-referral.page';

import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CustomersService } from '../../api/customers.service';
import { MessageService } from '../../helpers/message.service';

// import { AlertController } from '@ionic/angular';

// import { SearchResultComponent } from './search.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {

  public forms = {
    pvSiteVisit: PvSiteVisitPage,
    finalCheckOff: FinalCheckOffPage,
    initialCheckOff: InitialCheckOffPage,
    prePvSite: PrePvSitePage,
    closeOfSale: CloseOfSalePage,
    customerReferral: CustomerReferralPage
  };

  user: any = {
    avatar: "/assets/avatar.png"
  };

  // formLoading: Boolean = false;
  contacts: any = [];
  search_query: String = '';

  selectedContact: any;

  constructor(
    public modalController: ModalController,
    public popoverController: PopoverController,
    private statusBar: StatusBar,
    private customerService: CustomersService,
    // private alertController: AlertController,
    private messageService: MessageService,
    private events: Events) { }

  ngOnInit() {
    //this.statusBar.backgroundColorByHexString("#f4f4f4");
    //this.customerService.searchCustomers(  )
    this.contacts = [];
    this.search_query = '';

    this.handleEvents();
  }

  searchContacts(){
    if( this.search_query.length > 2  ){
      this.customerService.searchCustomers( this.search_query ).subscribe( res => {

        if( res.status ){
          this.contacts = res.data
        }

      } )
    }
  }

  handleEvents(){
    this.events.subscribe( 'customer:selected:forms', (customer) => {
      this.selectedContact = customer;
      console.log("Customer selected event: forms");
    } )
  }

  // selectCustomer(){
  //   console.log("working")
  // }

  // selectContact(contact){
  //   this.contacts = [];
  //   this.selectedContact = contact;
  //   this.search_query = contact.first_name + " " + contact.last_name;
  // }

  ionViewWillEnter(){
    this.getUser();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString("#f4f4f4");
  }

  getUser(){
    let _user = window.localStorage.getItem('user');
    if( _user !== null ){
      this.user = JSON.parse( _user );
    }
  }

  editForm(){
    //alert("working")
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: false,
      componentProps: { contact: this.selectedContact }
    });
    return await popover.present();
  }

  async presentProfileModal() {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  async presentFormModal(event, _form) {

    if( event.target.title === 'popover' ){
      return false;
    }

    if( this.selectedContact == undefined ){
      this.messageService.notice("Select a contact to proceed");
      return false;
    }

    const modal = await this.modalController.create({
      component: _form,
      componentProps: { 
        contact: this.selectedContact,
        onEdit: this.editForm()
      }
    });

    modal.present();

    // const alertEl = await this.alertController.create({
    //   header: 'Confirm Selected Contact',
    //   subHeader: this.selectedContact.first_name + ' ' + this.selectedContact.last_name,
    //   buttons: [
    //           {
    //             text: 'Cancel',
    //             handler: (res) => {
    //               console.log('Confirm Cancel');
    //             }
    //           },
    //           {
    //             text: 'Confirm',
    //             handler: (res) => {
    //               modal.present();
    //             }
    //           }]
    // });

    // await alertEl.present();

    // this.formLoading = true;  
    
  }

}
