import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';


import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Translation page.
 *
 * This page handles the translation services and their activation

 */

 @Component({
 	selector: 'page-translation',
 	templateUrl: 'translation.html',
 })
 export class TranslationPage {


 	yandex:any;
 	bing:any;
 	google:any;
 	constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController,public alertCtrl: AlertController) {
         console.log(!opctrl.hasKey('Yandex'),!opctrl.hasKey('Bing'),!opctrl.hasKey('Google'));
         this.yandex = !opctrl.hasKey('Yandex');
         this.bing = !opctrl.hasKey('Bing');
         this.google = !opctrl.hasKey('Google');
     }



     ionViewDidLoad() {
         console.log('ionViewDidLoad Translation');
     }

     /**
     * Utility function to prompt user to enter Yandex key if user wants to activate Yandex Translation Service
     */
     changeYandex(){
         if(this.yandex){
             let prompt = this.alertCtrl.create({
                 title: 'Yandex',
                 message: "",
                 enableBackdropDismiss : false,
                 inputs: [
                 {
                     name: 'key',
                     placeholder: 'Key'
                 }
                 ],
                 buttons: [
                 {
                     text: 'Cancel',
                     handler: data => {
                         this.yandex = false;
                     }
                 },
                 {
                     text: 'Save',
                     handler: data => {
                         this.opctrl.yandexTranslatorApiKey = data['key'];
                         this.opctrl.changeApiKey('Yandex');
                         this.yandex = !this.opctrl.hasKey('Yandex');
                     }
                 }
                 ]
             });
             prompt.present();
         }
     }

     /**
     * Utility function to prompt user to enter Bing client id and client secret if user wants to activate Bing Translation Service
     */
     changeBing(){
         if(this.bing){
             
             let prompt = this.alertCtrl.create({
                 title: 'Bing',
                 message: "",
                 enableBackdropDismiss : false,
                 inputs: [
                 {
                     name: 'client_id',
                     placeholder: 'Client Id'
                 },{
                     name: 'client_secret',
                     placeholder: 'Client Secret'
                 }
                 ],
                 buttons: [
                 {
                     text: 'Cancel',
                     handler: data => {
                         this.bing = false;
                         console.log('Cancel clicked');
                     }
                 },
                 {
                     text: 'Save',
                     handler: data => {

                         this.opctrl.bingTranslatorApiKey.clientId = data['client_id'];
                         this.opctrl.bingTranslatorApiKey.clientSecret = data['client_secret'];
                         this.opctrl.changeApiKey('Bing');
                         this.bing = !this.opctrl.hasKey('Bing');
                     }
                 }
                 ]
             });
             prompt.present();
         }
     }

     /**
     * Utility function to prompt user to enter Google key if user wants to activate Google Translation Service
     */
     changeGoogle(){
         if(this.google){
             

             let prompt = this.alertCtrl.create({
                 title: 'Google',
                 message: "",
                 inputs: [
                 {
                     name: 'key',
                     placeholder: 'Key'
                 }
                 ],
                 buttons: [
                 {
                     text: 'Cancel',
                     handler: data => {
                         this.google = false;
                         console.log('Cancel clicked');
                     }
                 },
                 {
                     text: 'Save',
                     handler: data => {
                         this.opctrl.googleTranslatorApiKey = data['key'];
                         this.opctrl.changeApiKey('Google');
                         this.google = !this.opctrl.hasKey('Google');

                     }
                 }
                 ]
             });
             prompt.present();
         }
     }


 }
