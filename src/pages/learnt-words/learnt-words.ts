import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LearntWords page.
 *
 * This page displays a list of all words learnt by the user

 */

 @Component({
     selector: 'page-learnt-words',
     templateUrl: 'learnt-words.html',
 })
 export class LearntWords {

     constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController,public alertCtrl: AlertController) {
         
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad LearntWords');
     }

     /**
     * Opens a dialog box to prompt user to enter new learnt word and adds to the learnt words list
     */
     add(){
         let prompt = this.alertCtrl.create({
             title: 'New Learnt Word',
             message: "",
             inputs: [
             {
                 name: 'new_learnt_word',
                 placeholder: 'Word'
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
                     console.log('Saved clicked');
                     this.opctrl.newLearntWord = data['new_learnt_word'];
                     this.opctrl.addLearntWord();
                 }
             }
             ]
         });
         prompt.present();
     }

 }
