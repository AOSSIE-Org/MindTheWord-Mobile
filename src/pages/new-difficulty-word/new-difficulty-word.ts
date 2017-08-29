import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';

/**
 * Generated class for the NewDifficultyWord page.
 *
 * This pages contains inputs for user to enter new difficulty word and select the level for it 

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

     /**
     * Wrapper function to add word to difficulty bucket 
     */
     add(){
         this.opctrl.addWordToDifficultyBucket();
         this.navCtrl.pop();
     }
 }
