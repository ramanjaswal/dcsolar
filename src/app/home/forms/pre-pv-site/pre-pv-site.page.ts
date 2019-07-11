import { Component, OnInit, Input } from '@angular/core';
import { ModalController   } from '@ionic/angular';

import { FormBuilder, Validators, FormArray } from '@angular/forms';

import{ FormsService } from '../../../api/forms.service';
import{ LoadingService } from '../../../helpers/loading.service';
import{ MessageService } from '../../../helpers/message.service';

import { UploaderService } from '../../../helpers/uploader.service';

@Component({
  selector: 'app-pre-pv-site',
  templateUrl: './pre-pv-site.page.html',
  styleUrls: ['./pre-pv-site.page.scss'],
})
export class PrePvSitePage implements OnInit {

  @Input() contact: any;

  form = this.fb.group({
    customer_id: [''],
    name: ['', Validators.required],
    siteAddress: ['', Validators.required],
    gate: ['Yes'],
    locked: ['No'],
    hoa: ['Yes'],
    gateCode: ['', Validators.required],
    clientPhone: ['', Validators.required],
    attic: ['No'],
    ladderAttic: ['10'],
    ladderForRoof: ['16'],
    roofType: ['Flat'],
    typeOfPanels: ['', Validators.required],
    howManyOnEachSurface: ['', Validators.required],
    typeOfInverter: ['', Validators.required],
    panelChange: ['Yes'],
    groundMount: ['', Validators.required],
    pictures: this.fb.array([]),
    siteNotes: ['', Validators.required]
  })

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private formService: FormsService,
    private loading: LoadingService,
    private messageService: MessageService,
    private uploader: UploaderService) { }

  ngOnInit() {
    this.form.patchValue({
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
    this.formService.savePrePVSiteVisitForm( this.form.value ).subscribe( res => {
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
