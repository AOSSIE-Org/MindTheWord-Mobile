import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';


import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Translation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-translation',
 	templateUrl: 'translation.html',
 })
 export class Translation {


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
