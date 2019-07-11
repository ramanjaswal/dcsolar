import { Component, OnInit, Input } from '@angular/core';
import { ModalController   } from '@ionic/angular';

import { FormBuilder, Validators, FormArray } from '@angular/forms';

import{ FormsService } from '../../../api/forms.service';
import{ LoadingService } from '../../../helpers/loading.service';
import{ MessageService } from '../../../helpers/message.service';

@Component({
  selector: 'app-final-check-off',
  templateUrl: './final-check-off.page.html',
  styleUrls: ['./final-check-off.page.scss'],
})
export class FinalCheckOffPage implements OnInit {

  @Input() contact: any;

  form = this.fb.group({
    customer_id: [''],
    project_name: ['', Validators.required],
    project_manager: ['', Validators.required],
    date: ['', Validators.required],
    visual_check_notes: ['', Validators.required],
    sun_eye_shot_taken: ['No'],
    minimal_shade: ['No'],
    array: ['', Validators.required],
    azimuth: ['', Validators.required],
    tilt: ['', Validators.required],
    photos_taken: ['', Validators.required],
    owner_comments: ['', Validators.required],
    inspector_comments: ['', Validators.required],
    additional_comments: ['', Validators.required],
  })

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private formService: FormsService,
    private loading: LoadingService,
    private messageService: MessageService) { }

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
    this.formService.saveFinalCheckOffForm( this.form.value ).subscribe( res => {
      this.loading.stop();

      if( res.status === true ){
        this.messageService.success( res.message );
        this.form.reset();
        this.closeModal();
      }
    } )
    
  }

}
