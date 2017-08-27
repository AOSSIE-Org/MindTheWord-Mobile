import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,MenuController } from 'ionic-angular';
// import {ColorPickerService} from 'angular2-color-picker';
import { HomePage } from '../home/home';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { OptionsController } from '../../providers/options';


/**
 * Generated class for the Landing page.
 *
 * Landing Page which has options to either sign in using [Google OAuth] {@link https://developers.google.com/identity/protocols/OAuth2} or skip 
 */

 @Component({
     selector: 'page-landing',
     templateUrl: 'landing.html',
 })
 export class LandingPage {

     constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController,private androidPermissions: AndroidPermissions,private menuCtrl:MenuController,public loadingCtrl: LoadingController) {
         this.checkPermission();

     }

     ionViewDidLoad() {
         this.menuCtrl.enable(false);
         console.log('ionViewDidLoad Landing');

     }


     /**
     * Wrapper function to initiate Google Sign In and handle the navigation
     */
     login(){
         let loading = this.loadingCtrl.create({
             content: 'Please wait...'
         });

         loading.present();
         this.opctrl.login().then(()=>{
             loading.dismiss();
             this.navCtrl.setRoot(HomePage);
         }).catch(()=>{
             loading.dismiss();
         });
     }

     /**
     * Skips the sign in and navigates to {@link HomePage} 
     */
     skip(){
         this.navCtrl.setRoot(HomePage);
     }


     /**
     * Utility function to check permission for reading external file storage and requests incase permission is not granted
     */
     checkPermission(){
         this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
             success=> localStorage.setItem('hasPermission','true'),
             error=>{
                 this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
                     success =>{
                         localStorage.setItem('hasPermission','true');
                     },
                     error=>{localStorage.setItem('hasPermission','false');console.log(error)});
             });
     }

 }
