import { Component, OnInit, Input } from '@angular/core';
import { ModalController   } from '@ionic/angular';

import { FormBuilder, Validators, FormArray } from '@angular/forms';

import{ FormsService } from '../../../api/forms.service';
import{ UtilsService } from '../../../api/utils.service';

import{ LoadingService } from '../../../helpers/loading.service';
import{ MessageService } from '../../../helpers/message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-referral',
  templateUrl: './customer-referral.page.html',
  styleUrls: ['./customer-referral.page.scss'],
})
export class CustomerReferralPage implements OnInit {

  @Input() contact: any;

  form = this.fb.group({
    customer_id: [''],
    referred_job_name: ['', Validators.required],
    check_payabled_to: ['', Validators.required],
    name: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    phone1: ['', Validators.required],
    phone2: ['', Validators.required],
    email: ['', Validators.required],
    date: ['', Validators.required],
  });

  states: any = [];
  cities: any = [];
  loadingCities: Boolean = false;

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private formService: FormsService,
    private loading: LoadingService,
    private messageService: MessageService,
    private utilsService: UtilsService ) { }

  ngOnInit() {
    let date = new Date();
    this.form.patchValue({
      date: date.toISOString(),
      customer_id: this.contact.ac_id
    })

    this.getStates();
  }

  getStates(){
    this.utilsService.getStates().subscribe( res => {
      if(res.status){
        this.states = res.data;
      }
    })
  }

  getCities(){
    this.cities = [];
    let state = this.form.get('state').value;

    if( state == '' || state == undefined || state == null ){
      return false;
    }

    this.loadingCities = true;
    this.utilsService.getCities(state).subscribe( res => {
      this.loadingCities = false;
      if(res.status){
        this.cities = res.data;
      }
    } )
  }

  closeModal(){
  	this.modalCtrl.dismiss();
  }

  saveForm(){

    if( this.form.invalid){
      this.messageService.error('Enter all the fields');
      return false;
    }

    this.loading.start( 'Saving...' );
    this.formService.saveCustomerReferral( this.form.value ).subscribe( res => {
      this.loading.stop();

      if( res.status === true ){
        this.messageService.success( res.message );
        this.form.reset();
        this.closeModal();
      }
    } )

  }


}
