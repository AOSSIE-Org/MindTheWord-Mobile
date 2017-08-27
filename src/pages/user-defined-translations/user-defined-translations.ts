import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the UserDefinedTranslations page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
     selector: 'page-user-defined-translations',
     templateUrl: 'user-defined-translations.html',
 })
 export class UserDefinedTranslations {

     constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController,public alertCtrl: AlertController) {
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad UserDefinedTranslations');
     }



     add(){
         let prompt = this.alertCtrl.create({
             title: 'New User Defined Translation',
             message: "",
             inputs: [
             {
                 name: 'new_user_defined_translation_original',
                 placeholder: 'Original'
             },{
                 name: 'new_user_defined_translation_translated',
                 placeholder: 'Translated'
             },
             ],
             buttons: [
             {
                 text: 'Cancel',
                 handler: data => {
                     console.log('Cancel clicked');
                 }
             },
             {
                 text: 'Save',
                 handler: data => {
                     this.opctrl.original = data['new_user_defined_translation_original'];
                     this.opctrl.translated = data['new_user_defined_translation_translated'];
                     this.opctrl.addUserDefinedTranslation();
                 }
             }
             ]
         });
         prompt.present();
     }
 }
