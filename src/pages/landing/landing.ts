import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,MenuController } from 'ionic-angular';
// import {ColorPickerService} from 'angular2-color-picker';
import { HomePage } from '../home/home';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { OptionsController } from '../../providers/options';


/**
 * Generated class for the Landing page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
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

     skip(){
         this.navCtrl.setRoot(HomePage);
     }



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
