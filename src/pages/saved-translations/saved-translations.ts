import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SavedTranslations page.
 *
 * This page displays a list of all saved translations by the user
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

     /**
     * Opens a dialog box to prompt user to enter new saved translation word and adds to the list
     */
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
