import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BlacklistWebsites } from '../blacklist-websites/blacklist-websites';
import { BlacklistWords } from '../blacklist-words/blacklist-words';
import { AlertController } from 'ionic-angular';

import { OptionsController } from '../../providers/options';

/**
 * Generated class for the Blacklist page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
     selector: 'page-blacklist',
     templateUrl: 'blacklist.html',
 })
 export class Blacklist {


     autoBlacklist : any;
     constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController,public alertCtrl: AlertController) {
         this.autoBlacklist = this.opctrl.autoBlacklist;
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad Blacklist');
     }

     goToBlacklistWebsite(){
         this.navCtrl.push(BlacklistWebsites);
     }

     goToBlacklistWord(){
         this.navCtrl.push(BlacklistWords);
     }

     changeAutoBlacklist(){
         if(this.autoBlacklist){
             let prompt = this.alertCtrl.create({
                 title: 'Auto Blacklist',
                 message: "Provide Maximum Word Toggles and Maximum Activation Toggles",
                 enableBackdropDismiss : false,
                 inputs: [
                 {
                     name: 'maximum_word_toggles',
                     placeholder: 'Maximum Word Toggles',
                     value: this.opctrl.wordToggles
                 },
                 {
                     name: 'maximum_activation_toggles',
                     placeholder: 'Maximum Activation Toggles',
                     value: this.opctrl.activationToggles
                 }
                 ],
                 buttons: [
                 {
                     text: 'Cancel',
                     handler: data => {
                         this.autoBlacklist = false;
                     }
                 },
                 {
                     text: 'Save',
                     handler: data => {
                         if (this.opctrl.wordToggles != data['maximum_word_toggles']) {
                             console.log(this.opctrl.wordToggles, data['maximum_word_toggles']);
                             this.opctrl.wordToggles = data['maximum_word_toggles'];
                             this.opctrl.updateWordToggles();
                         }
                         if (this.opctrl.activationToggles != data['maximum_activation_toggles']) {
                             console.log(this.opctrl.activationToggles, data['maximum_activation_toggles']);
                             this.opctrl.activationToggles = data['maximum_activation_toggles'];
                             this.opctrl.updateActivationToggles();
                         }
                         this.autoBlacklist = this.opctrl.autoBlacklist;
                     }
                 }
                 ]
             });
             prompt.present();
         }
     }
 }
