import { Component, OnInit, Input } from '@angular/core';
import { ModalController   } from '@ionic/angular';

import { FormBuilder, Validators, FormArray } from '@angular/forms';

import{ FormsService } from '../../../api/forms.service';
import{ LoadingService } from '../../../helpers/loading.service';
import{ MessageService } from '../../../helpers/message.service';

import { UploaderService } from '../../../helpers/uploader.service';

@Component({
  selector: 'app-initial-check-off',
  templateUrl: './initial-check-off.page.html',
  styleUrls: ['./initial-check-off.page.scss'],
})
export class InitialCheckOffPage implements OnInit {

  @Input() contact: any;

  form = this.fb.group({
    customer_id: [''],
    project_name: ['', Validators.required],
    project_manager: ['', Validators.required],
    date: ['', Validators.required],
    layout_needs_change: ['No'],
    how_many_inverters: ['', Validators.required],
    micros_plugged_in: ['Yes'],
    location_of_emt: ['', Validators.required],
    junction_boxes: ['Yes'],
    how_many_boxes: [''],
    smurf_tube: ['Yes'],
    system_grounded: ['Yes'],
    bonded: ['Yes'],
    cell_modem: ['Yes'],
    envoy_serial_number: [''],
    criteer_guard: ['Yes'],
    rolls: [''],
    total_man_hours: ['', Validators.required],
    conduits_painted: ['Yes'],
    silicon_sealing: ['Yes'],
    photos_mailed: ['Yes'],
    array_photo: [false],
    main_panel_photo: [false],
    modules_photo: [false],
    sub_panel_photo: [false],
    inspection_scheduled: ['Yes'],
    date_of_inspection: ['', Validators.required],
    attachments: this.fb.array([]),
    site_notes: ['', Validators.required]
  })

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

  closeModal(){
  	this.modalCtrl.dismiss();
  }

  saveForm(){

    if( this.form.invalid){
      this.messageService.error('Enter all the fields');
      return false;
    }

    this.loading.start( 'Saving...' );
    this.formService.saveInitialCheckOffForm( this.form.value ).subscribe( res => {
      this.loading.stop();

      if( res.status === true ){
        this.messageService.success( res.message );
        this.form.reset();
        this.closeModal();
      }
    } )
  }

  uploadPhoto( key ){

    this.uploader.uploadPhoto().then( ( file_path ) => {
      let fileArr = this.form.get( key ) as FormArray
      fileArr.push( this.fb.control( file_path ) );
    } )

  }

  filesCount( key ){
    let fileArr = this.form.get( key ) as FormArray
    return fileArr.length;
  }

}
