import { Component, OnInit, Input } from '@angular/core';
import { ModalController   } from '@ionic/angular';

import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormsService } from '../../../api/forms.service';
import { LoadingService } from '../../../helpers/loading.service';
import { MessageService } from '../../../helpers/message.service';

import { UploaderService } from '../../../helpers/uploader.service';

@Component({
  selector: 'app-close-of-sale',
  templateUrl: './close-of-sale.page.html',
  styleUrls: ['./close-of-sale.page.scss'],
})
export class CloseOfSalePage implements OnInit {

  @Input() contact: any;

  form = this.fb.group({
    customer_id: [''],
    designer: ['', Validators.required],
    date: ['', Validators.required],
    client_name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    proposal: ['', Validators.required],
    totaling: ['', Validators.required],
    ac_system_size: ['', Validators.required],
    modules: ['', Validators.required],
    inverters: ['', Validators.required],
    proposal_year: ['', Validators.required],
    other: ['', Validators.required],
    accept_bid: ['No', Validators.required],
    accept_prices: ['No', Validators.required],
    equipment_price: ['', Validators.required],
    install_price: ['', Validators.required],
    deposit_price: ['', Validators.required],
    permit_price: ['', Validators.required],
    rebate_price: ['', Validators.required],
    total_cost: ['', Validators.required],
    module_color: ['Black', Validators.required],
    module_color_other: [''],
    racking: ['Black', Validators.required],
    racking_other: [''],
    special_items: ['', Validators.required],
    amount_paid: ['', Validators.required],
    check_number: ['', Validators.required],
    recieved_by: ['', Validators.required],
    payment_date: ['', Validators.required],
    financed_by: ['', Validators.required],
    deposit_paid_by_lender: ['', Validators.required],
    name_on_solar_contract: ['', Validators.required],
    name_on_property_deed: ['', Validators.required],
    utility: this.fb.group({
        account_number: this.fb.group({
            pre: ['', Validators.required],
            post: ['', Validators.required]
        }),
        meter_number: ['', Validators.required],
        service_id: ['', Validators.required],
        name_on_utility_account: ['', Validators.required],
        sq_feet: ['', Validators.required],
        accept_utility_rates: ['No', Validators.required],
        time_of_use_rates: ['E-TOU-B', Validators.required],
        time_of_use_rates_other: [''],
        enrolled_in_pge: ['No', Validators.required],
        peak_of_day: [false],
        scheduled_load: [false],
        smart_rate: [false],
        load_reduction: [false],
        program_other: [''],
        accept_system: ['No', Validators.required],
        location_permitted: ['No', Validators.required],
        location_permitted_other: [''],
    }),
    age_of_roof: ['', Validators.required],
    module_layout: ['Landscape', Validators.required],
    array_description: this.fb.group({
      location: ['', Validators.required],
      number_of_rows: ['', Validators.required],
      number_of_panels: ['', Validators.required],
      roofing_material: ['Spanish', Validators.required],
      comp_photo: this.fb.array([]),
      accept_location: ['No', Validators.required],
      my_work: ['', Validators.required],
      system_monitored: ['No', Validators.required],
      connecting_method: ['', Validators.required],
      accept_internet_connection: ['No', Validators.required],
      informed_about_co: ['No', Validators.required],
      already_have_co: ['No', Validators.required],
      own_dogs_cats: ['No', Validators.required],
      photos_of_roofing: ['Inside', Validators.required]
    }),
    have_locked_gate: ['No', Validators.required],
    gate_code: ['', Validators.required],
    part_of_hoa: ['No', Validators.required],
    contact_info_via: ['Email', Validators.required],
    desired_date_of_install: ['', Validators.required],
    unavailable_dates: ['', Validators.required],
    accept_install_dates: ['No', Validators.required],
    accept_availability: ['No', Validators.required],
    accept_referral: ['Yes', Validators.required],
    dc_solar_yard: ['Yes', Validators.required],
    dc_solar_yard_duration: [''],
    best_time_to_reach: ['', Validators.required],
    additional_notes: ['', Validators.required],
  });

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private formService: FormsService,
    private loading: LoadingService,
    private messageService: MessageService,
    private uploader: UploaderService) { }

  ngOnInit() {
    let date = new Date();
    this.form.patchValue({
      date: date.toISOString(),
      customer_id: this.contact.ac_id
    })
  }

  saveForm(){

    if( this.form.invalid){
      this.messageService.error('Enter all the fields');
      return false;
    }

    this.loading.start( 'Saving...' );
    this.formService.saveCloseOfSaleForm( this.form.value ).subscribe( res => {
      this.loading.stop();
      if( res.status === true ){
        this.messageService.success( res.message );
        this.form.reset();
        this.closeModal();
      }
    } )
  }

  closeModal(){
  	this.modalCtrl.dismiss();
  }

  uploadPhoto( key ){
    this.uploader.uploadPhoto().then( ( file_path ) => {
      let fileArr = this.form.get('array_description').get( key ) as FormArray
      fileArr.push( this.fb.control( file_path ) );
    } )
  }

  filesCount( key ){
    let fileArr = this.form.get('array_description').get( key ) as FormArray
    return fileArr.length;
  }

}
