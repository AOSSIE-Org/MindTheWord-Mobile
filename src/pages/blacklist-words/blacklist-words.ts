import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the BlacklistWords page.
 *
 * This page displays a list of all words which have been blacklisted
 */

 @Component({
     selector: 'page-blacklist-words',
     templateUrl: 'blacklist-words.html',
 })
 export class BlacklistWords {

     constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController,public alertCtrl: AlertController) {
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad BlacklistWords');
     }

     /**
     * Opens a dialog box to prompt user to enter new word adds to the blacklist words list
     */
     add(){
         let prompt = this.alertCtrl.create({
             title: 'New Blacklist Word',
             message: "",
             inputs: [
             {
                 name: 'new_blacklist_word',
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
                     this.opctrl.newBlacklistWord = data['new_blacklist_word'];
                     this.opctrl.addBlackListedWord();
                 }
             }
             ]
         });
         prompt.present();
     }

 }
