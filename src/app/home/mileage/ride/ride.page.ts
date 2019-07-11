import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController, Events   } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingService } from '../../../helpers/loading.service';
import { MessageService } from '../../../helpers/message.service';
import { Storage } from '@ionic/storage';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { MileageService } from '../../../api/mileage.service';

declare var google: any;

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

	@ViewChild('map') mapRef: ElementRef<any>;

  	start_from = "";
	tracking: Boolean = false;

	zoom: number = 14;
	watch: any;
	map: any;

	mapLoaded: Boolean = false;

	startLocation: any = {
		lat: 51.678418,
		lng: 51.678418
	}

	currentLocation: any = {
		lat: 51.678418,
		lng: 51.678418
	}

	mapCenter: any = {
		lat: 51.678418,
		lng: 51.678418
	}

	geoLocationOptions = {
		enableHighAccuracy: true
	}

	startMarker: any;
	liveMarker: any;

	liveCircle: any;
	livePath: any;

	path = [];

  	constructor(
		public modalCtrl: ModalController,
		private geolocation: Geolocation,
		private loading: LoadingService,
		private storage: Storage,
		private events: Events,
		private backgroundGeolocation: BackgroundGeolocation,
		private messageService: MessageService,
		private mileageService: MileageService) { }

	ngOnInit() {

	}

	ionViewDidEnter(){

		this.mapLoaded = false;

		this.backgroundGeolocation.checkStatus().then( status => {
			if( status.isRunning ){
				alert("Already running");
				this.tracking = true;

				this.storage.get("route").then( locations => {
					alert( JSON.stringify(locations) );

					this.startLocation = locations[0];
					this.mapCenter = locations[0];
				} )

				this.backgroundGeolocation.getCurrentLocation().then( location => {
					let moveto = {
						lat: location.latitude,
						lng: location.longitude
					}
					
					this.onLocationUpdate(moveto);
				} )

			}else{
				alert("not running");

				this.getCurrentPosition().then( () => {
			
					this.startLocation = Object.assign( {}, this.currentLocation);
					this.mapCenter = Object.assign( {}, this.currentLocation);
		
					setTimeout( () => {
						this.geoCodeLatLng();
					}, 300 );

					let save_location = [ this.startLocation ];
					this.storage.set("route", save_location);
					
					// this.path.push( this.startLocation );
		
					this.initMap();
				} );

				this.handleBackgroundLocation();
			}
		} );
	}

	initMap(){
		let options = {
			zoom: this.zoom,
			center: this.mapCenter,
			disableDefaultUI: true,
			maxZoom: 18,
			zoom_changed: () => this.onZoomChanged()
		}
		this.map = new google.maps.Map( this.mapRef.nativeElement, options )

		this.startMarker = new google.maps.Marker({ 
			position: this.startLocation, 
			map: this.map,
			animation: google.maps.Animation.DROP
		});

		setTimeout( () => {
			this.mapLoaded = true;
		})
	}

	addTrackingMarker(){

		return new Promise( resolve => {

			this.liveMarker = new google.maps.Marker({ 
				position: this.startLocation, 
				map: this.map,
				animation: google.maps.Animation.DROP 
			});
	
			this.liveCircle =  new google.maps.Circle({
				map: this.map,
				center: this.currentLocation,
				radius: 25,
				strokeWeight: 0,
				fillColor: '#42cbf5',
				fillOpacity: 0.2,
				visible: this.circleVisible()
			});

			// this.livePath = new google.maps.Polyline({
			// 	map: this.map,
			// 	path: [],
			// 	strokeWeight: 2,
			// 	strokeColor: '#42b6f5',
			// 	visible: false
			// })

			setTimeout( () => {
				resolve(true);
			} )

		} )

	}

	circleVisible(): Boolean{
		return this.map.zoom > 16 && this.tracking
	}

	onZoomChanged(){

		if( this.circleVisible() ){
			this.liveCircle.setVisible( true )
		}
		else if(this.liveCircle){
			this.liveCircle.setVisible( false )
		}
	}

	recenter(){

		this.map.setZoom( this.zoom );
		this.map.panTo( this.mapCenter );
		
		this.geoCodeLatLng();
	}

	getCurrentPosition(){
		//this.loading.start();
		return new Promise( resolve => {

			this.geolocation.getCurrentPosition(this.geoLocationOptions).then((resp) => {
				//this.loading.stop();
				// resp.coords.latitude
				// resp.coords.longitude
				this.currentLocation.lat = resp.coords.latitude;
				this.currentLocation.lng = resp.coords.longitude;
	
				resolve(true);

			}).catch((error) => {
				console.log('Error getting location', error);
			});

		} )
		
	}

	geoCodeLatLng(){

		if(google && google.maps){

			let geocoder = new google.maps.Geocoder();
			geocoder.geocode({'location': {lat: this.startLocation.lat, lng: this.startLocation.lng} }, (results, status) => {

				if (status === 'OK') {
					if (results[0]) {
						this.start_from = results[0].formatted_address;
					}
				}
			} )

		}

	}
	

	watchPosition(){
		this.watch = this.geolocation.watchPosition(this.geoLocationOptions);
		this.watch.subscribe((data) => {
			// data can be a set of coordinates, or an error (if an error occurred).
			let moveto = { 
				lat: data.coords.latitude, 
				lng: data.coords.longitude  
			}

			this.onLocationUpdate( moveto );

			//let currentPosition = Object.assign( {},  this.currentLocation)
			
			// this.map.setCenter( moveto  );
			// this.animatedMove( currentPosition, moveto );

			// this.liveMarker.setPosition({ moveto });
			// this.liveCircle.setCenter({ moveto })

			//update current location
			// this.currentLocation = Object.assign( {}, moveto );
			// this.path.push( moveto );

			// this.updatePath();
		});
	}

	async onLocationUpdate( location: { lat: any, lng: any } ){

		this.liveMarker.setPosition( location );
		this.liveCircle.setCenter( location );
		this.currentLocation = location;

		let locations = await this.storage.get("route");

		locations.push( location );

		this.storage.set("route", locations);
		
	}

	updatePath(){
		// this.livePath.setPath( this.path );
		// this.livePath.setVisible( true );
	}

	clearWatch(){
		debugger
		//this.watch.unsubscribe();
	}

	startTracking(){
		this.tracking = true;
		this.addTrackingMarker().then( () => {
			//this.watchPosition();
			this.events.publish("bg:location:start");
		} )
	}

	stopTracking(){
		this.tracking = false;
		// this.clearWatch();
		this.liveCircle.setMap(null); //remove circle when tracking stopped
		//this.liveMarker.setMap(null);
		this.events.publish("bg:location:stop");

		this.drawRoute();
		this.calculateDistance();
	}

	drawRoute(){
		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer();

		directionsDisplay.setMap( this.map );

		this.startMarker.setMap( null ); //remove location markers
		this.liveMarker.setMap( null );
		  
		var route_options = {
			origin: this.startLocation,
			destination: this.currentLocation,
			waypoints: [
				// { location: { lat: 30.7233239, lng: 76.6843806 }, stopover: false },
				// { location: { lat: 30.7133422, lng: 76.6899949 }, stopover: false },
				// { location: { lat: 30.7247288, lng: 76.7238744 }, stopover: false }
			],
			travelMode: 'DRIVING'
		};

		directionsService.route( route_options, function(result, status) {
			if (status == 'OK') {
			  directionsDisplay.setDirections(result);
			}
		});

	}

	calculateDistance(){
		
		let distanceMatrixService = new google.maps.DistanceMatrixService();
		
		let origin = new google.maps.LatLng( this.startLocation.lat, this.startLocation.lng );
		let destination = new google.maps.LatLng( this.currentLocation );

		distanceMatrixService.getDistanceMatrix({
			origins: [ origin ],
			destinations: [ destination ],
			travelMode: 'DRIVING',
			unitSystem : google.maps.UnitSystem.IMPERIAL
		}, (response, status) => {
			//console.log( response );
			if( status == 'OK' ){
				let distance = response.rows[0].elements[0].distance
				this.saveTrip( distance );
			}
			
		})

	}

	async saveTrip(distance){
		
		let _route = await this.storage.get('route');

		let _trip = {
			route: _route,
			distance_text: distance.text,
			distance_value: distance.value,
			origin: this.startLocation,
			destination: this.currentLocation
		}

		this.mileageService.saveTrip( _trip ).subscribe( res => {
			if( res.status ){
				this.messageService.success( res.message );
			}
		} )

	}

	closeModal(){
		this.modalCtrl.dismiss();
	}

	clearLocation(){
		this.start_from = '';
	}

	handleBackgroundLocation(){
		this.events.subscribe('bg:location:response', (location) => {
			let moveto = {
				lat: location.latitude,
				lng: location.longitude,
			}
			this.onLocationUpdate( moveto );
		})
	}

	animatedMove( current, moveto) {

		let t = 0.5;

		let lat = current.lat;
		let lng = current.lng;
	  
		let deltalat = (moveto.lat - current.lat) / 100;
		let deltalng = (moveto.lng - current.lng) / 100;
	  
		let delay = 10 * t;
		for (let i = 0; i < 100; i++) {

		  ( (ind) => {
			setTimeout(
			  () => {
				let lat = this.liveMarker.position.lat();
				let lng = this.liveMarker.position.lng();
				lat += deltalat;
				lng += deltalng;
				let latlng = new google.maps.LatLng(lat, lng);
				this.liveMarker.setPosition(latlng);
			  }, delay * ind
			);
		  })(i)

		}
	}
	

}
