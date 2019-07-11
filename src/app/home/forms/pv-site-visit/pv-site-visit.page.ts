import { Component, OnInit, Input } from '@angular/core';
import { ModalController   } from '@ionic/angular';

import { FormBuilder, Validators, FormArray } from '@angular/forms';

// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { FormsService } from '../../../api/forms.service';
import { LoadingService } from '../../../helpers/loading.service';
import { MessageService } from '../../../helpers/message.service';

import { UploaderService } from '../../../helpers/uploader.service';

// import{ AuthService } from '../../../helpers/auth.service';

@Component({
  selector: 'app-pv-site-visit',
  templateUrl: './pv-site-visit.page.html',
  styleUrls: ['./pv-site-visit.page.scss'],
})
export class PvSiteVisitPage implements OnInit {

  @Input() contact: any;

  form = this.fb.group({
      customer_id: [''],
      employeeName: ['', Validators.required],
      visitDate: ['', Validators.required],
      visitTime: ['', Validators.required],
      project: this.fb.group({
        name: ['', Validators.required],
        siteAddress: ['', Validators.required],
        gate: ['Yes'],
        locked: ['No'],
        hoa: ['Yes'],
        gateCode: ['', Validators.required],
        phone1: ['', Validators.required],
        phone2: ['', Validators.required],
        email: ['', Validators.required],
        buildingJurisdiction: ['city', Validators.required],
        buildingJurisdictionOther: [''],
        elevation: ['', Validators.required],
        utilityProvider: ['', Validators.required],
        utilityBill: ['', Validators.required],
        yearBuilt: ['', Validators.required],
        ageOfRoof: this.fb.group({
          num: ['', Validators.required],
          den: ['', Validators.required]
        }),
        condition: ['', Validators.required],
        newConstruction: ['No', Validators.required],
        newConstructionOther: ['']
      }),
      electricalGridType: this.fb.group({
        phase: ['single', Validators.required],
        voltage: ['', Validators.required]
      }),
      existingPanel: this.fb.group({
        brand: ['', Validators.required],
        busAmpRating: ['100'],
        mainBreakerSize: ['100'],
        spacesInPanel: ['', Validators.required],
        subPanel: ['No'],
        qty: [''],
        locations: ['']
      }),
      distanceFrom: this.fb.group({
        arrayToMain: ['', Validators.required],
        arrayToSub: ['', Validators.required],
        mainToSub: ['', Validators.required],
        other: [''],
        constructionDetail: ['residential', Validators.required],
        structureFor: ['parking', Validators.required],
        rafter: ['vert', Validators.required],
        stud: ['metal', Validators.required],
        size: ['2x4', Validators.required],
        sizeOther: [''],
        story: ['1', Validators.required],
        howEasyToAccess: ['', Validators.required],
        pointOfAccess: ['', Validators.required]
      }),
      roof: this.fb.group({
        groundToGutter: this.fb.group({
          first: ['', Validators.required],
          second: ['', Validators.required],
        }),
        attic: ['8'],
        extension: ['12', Validators.required],
        qty: ['', Validators.required],
        roofPitch: ['', Validators.required],
        tilt: ['', Validators.required],
        orientation: this.fb.group({
          one: ['', Validators.required],
          two: ['', Validators.required],
          three: ['', Validators.required],
        }),
        roofType: ['comp'],
        roofTypeOther: [''],
        physicalLayout: ['No'],
        physicalMeasurement: ['No']
      }),
      siteNotes: ['', Validators.required],
      files: this.fb.group({
          atticAccess: this.fb.array([]),
          roofAccess: this.fb.array([]),
          driveWayTo: this.fb.array([]),
          allRoofsWithPanels: this.fb.array([]),
          mainPanelNear: this.fb.array([]),
          mainPanelFar: this.fb.array([]),
          mainBreaker: this.fb.array([]),
          namePlateRating: this.fb.array([]),
          deadfrontOn: this.fb.array([]),
          deadfrontOff: this.fb.array([]),
          breakers: this.fb.array([]),
          smurfTube: this.fb.array([]),
          subPanel: this.fb.array([]),
          subPanelDeadfrontOn: this.fb.array([]),
          subPanelDeadfrontOff: this.fb.array([]),
          subPanelBreakers: this.fb.array([]),
          locationOfArray: this.fb.array([]),
          groundForTrenching: this.fb.array([]),
          directionOfTrench: this.fb.array([]),
      })
  })

  photokey: any;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private formService: FormsService,
    private loading: LoadingService,
    private messageService: MessageService,
    // private camera: Camera,
    // private transfer: FileTransfer,
    private uploader: UploaderService) { }

  ngOnInit() {

    let user = JSON.parse( localStorage.getItem('user') );
    let date = new Date();

    this.form.patchValue({
      employeeName: user.firstname + " " + user.lastname,
      visitDate: date.toISOString(),
      visitTime: date.toISOString(),
      customer_id: this.contact.ac_id
    });

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
    this.formService.savePVSiteVisitForm( this.form.value ).subscribe( res => {
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
      let fileArr = this.form.get('files').get( key ) as FormArray
      fileArr.push( this.fb.control( file_path ) );
    } )
  }

  filesCount( key ){
    let fileArr = this.form.get('files').get( key ) as FormArray
    return fileArr.length;
  }

}
