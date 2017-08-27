import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { ColorPickerService } from 'angular2-color-picker';
import { AlertController } from 'ionic-angular';

import { OptionsController } from '../../providers/options';

import { UserDefinedTranslations } from '../user-defined-translations/user-defined-translations';
import { PlaybackSettings } from '../playback-settings/playback-settings';

/**
 * Generated class for the Advanced page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
     selector: 'page-advanced',
     templateUrl: 'advanced.html',
 })
 export class Advanced {

     // private color: string = "#127bdc";
     toggle : any;
     lastColor : any;
     constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController,public alertCtrl: AlertController) {
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad Advanced');
     }

     changeMinLengthWord(){
         let prompt = this.alertCtrl.create({
             title: 'Minimum Word Length',
             message: "",
             inputs: [
             {
                 name: 'min_word_length',
                 placeholder: 'Length',
                 value: this.opctrl.minWordLength,
                 type:'number'
             }
             ],
             buttons: [
             {
                 text: 'Cancel',
                 role:'cancel',
                 handler: data => {
                     console.log('Cancel clicked');
                 }
             },
             {
                 text: 'Save',
                 handler: data => {
                     if(this.opctrl.minWordLength !=data['min_word_length']){
                         this.opctrl.minWordLength = data['min_word_length'];
                         this.opctrl.setMinWordLength();
                     }
                 }
             }
             ]
         });
         prompt.present();
     }

     changeTranslatedSequences(){
         let prompt = this.alertCtrl.create({
             title: 'Translated Sequences',
             message: "Set Minimum Words and Maximum Words",
             inputs: [
             {
                 name: 'min_word_length',
                 placeholder: 'Min Word',
                 value: this.opctrl.ngramMin,
                 type:'number'
             },{
                 name: 'max_word_length',
                 placeholder: 'Max Word',
                 value: this.opctrl.ngramMax,
                 type:'number'
             }
             ],
             buttons: [
             {
                 text: 'Cancel',
                 role:'cancel',
                 handler: data => {
                     console.log('Cancel clicked');
                 }
             },
             {
                 text: 'Save',
                 handler: data => {
                     if (this.opctrl.ngramMin != data['min_word_length']) {
                         this.opctrl.ngramMin = data['min_word_length'];
                         this.opctrl.setNgramMin()
                     }
                     if (this.opctrl.ngramMax != data['max_word_length']) {
                         this.opctrl.ngramMax = data['max_word_length'];
                         this.opctrl.setNgramMax()
                     }
                 }
             }
             ]
         });
         prompt.present();
     }

     goToUserDefinedTranslations(){
         this.navCtrl.push(UserDefinedTranslations);
     }

     goToPlaybackSettings(){
         this.navCtrl.push(PlaybackSettings);
     }

     notify($event){
         console.log($event,1);
     }
 }
