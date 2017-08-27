import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';
import { NewDifficultyWord } from '../new-difficulty-word/new-difficulty-word';

/**
 * Generated class for the DifficultyBuckets page.
 *
 * This page displays a list of all difficulty words
 */

 @Component({
     selector: 'page-difficulty-buckets',
     templateUrl: 'difficulty-buckets.html',
 })
 export class DifficultyBuckets {

     constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController) {
         console.log(2);
     }

     ionViewDidLoad() {
         // console.log('ionViewDidLoad DifficultyBuckets');
     }

     /**
     * Navigates to a new page to add Difficulty Words
     */
     add(){
         this.navCtrl.push(NewDifficultyWord);
     }

 }
