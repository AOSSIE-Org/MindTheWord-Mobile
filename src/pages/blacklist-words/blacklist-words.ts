import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the BlacklistWords page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
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
