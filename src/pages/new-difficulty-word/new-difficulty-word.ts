import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';

/**
 * Generated class for the NewDifficultyWord page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
     selector: 'page-new-difficulty-word',
     templateUrl: 'new-difficulty-word.html',
 })
 export class NewDifficultyWord {

     constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController) {
         console.log(1);
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad NewDifficultyWord');
     }

     add(){
         this.opctrl.addWordToDifficultyBucket();
         this.navCtrl.pop();
     }
 }
