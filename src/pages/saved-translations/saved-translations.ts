import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SavedTranslations page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
     selector: 'page-saved-translations',
     templateUrl: 'saved-translations.html',
 })
 export class SavedTranslations {

     constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController,public alertCtrl: AlertController) {
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad SavedTranslations');
     }


     add(){
         let prompt = this.alertCtrl.create({
             title: 'New Saved Translation',
             message: "",
             inputs: [
             {
                 name: 'new_saved_translation_original',
                 placeholder: 'Original'
             },{
                 name: 'new_saved_translation_translated',
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
                     this.opctrl.original = data['new_saved_translation_original'];
                     this.opctrl.translated = data['new_saved_translation_translated'];
                     this.opctrl.saveTranslation();
                 }
             }
             ]
         });
         prompt.present();
     }
 }
