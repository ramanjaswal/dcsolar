import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { LoadingService } from './loading.service';
import { MessageService } from './message.service';

import { apiBaseURL } from '../config';


@Injectable({
  providedIn: 'root'
})
export class UploaderService {

  constructor(
    private camera: Camera,
    private transfer: FileTransfer,
    private loading: LoadingService,
    private messageService: MessageService
  ) { }

  uploadPhoto(){

    return new Promise( resolve => {

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
    
      this.camera.getPicture(options).then((imageURI) => {
        
        const fileTransfer: FileTransferObject = this.transfer.create();

        const token = window.localStorage.getItem('jwt');
    
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: 'file',
          chunkedMode: false,
          mimeType: "image/jpeg",
          headers: { 'x-api-key': token }
        }
    
        this.loading.start("Uploading...");

        fileTransfer.upload(imageURI, apiBaseURL + '/file-upload' , options)
          .then((data) => {
        
              this.loading.stop();

              let _response = JSON.parse( data.response )
              
              if( _response.status ){
                this.messageService.success( _response.message );

                resolve( _response.file );
              }
              else{
                this.messageService.error( _response.message );
              }
              
              //this.afterFileUpload(data.response);

          }, (err) => {

            console.log(err);
            this.loading.stop();
            this.messageService.error(err);

          });

      }, (err) => {
        console.log(err);
        //alert(JSON.stringify(err));
      });

    } );

  }

}
