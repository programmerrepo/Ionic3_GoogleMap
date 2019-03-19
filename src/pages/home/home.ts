import { Component } from '@angular/core';
import { NavController , Platform } from 'ionic-angular';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  map : GoogleMap ;
  lat = 0;
  long =0;

  constructor(public navCtrl: NavController , public platform: Platform, public geolocation: Geolocation) {
    
    platform.ready().then(()=>{
      
      this.loadmap();
    });

  }
  
  loadmap(){
    
    
    this.geolocation.getCurrentPosition().then((resp) => {
     this.lat = resp.coords.latitude ;
     this.long = resp.coords.longitude ;
       
     this.map = new GoogleMap('map',{
      
      'controls':{
        'compass':true,
        'myLocationButton':true,
        'indoorPicker':true,
        'zoom':true
      },
      
      'gestures':{
        'scroll':true,
        'tilt':true,
        'rotate':true,
        'zoom':true
      },
      
     'camera': {
         target: {
           lat: this.lat,
           lng: this.long
         },
         zoom: 18,
         tilt: 30,
         'bearing':50
       }
      
      });
     
     
     
     let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.lat,
        lng: this.long
      }
    });
     
    marker.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready now');
    });
     
   }).catch((error) => {
 console.log('Error getting location', error);
});
     
 
      
      
      
  }

}
