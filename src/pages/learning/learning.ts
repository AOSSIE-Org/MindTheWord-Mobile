import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DifficultyBuckets } from '../difficulty-buckets/difficulty-buckets';
import { LearntWords } from '../learnt-words/learnt-words';
import { SavedTranslations } from '../saved-translations/saved-translations';
/**
 * Generated class for the Learning page.
 *
 * This page contains options for several learning options
 */

 @Component({
     selector: 'page-learning',
     templateUrl: 'learning.html',
 })
 export class LearningPage {

     /**
     * Contains list of Pages where the user will navigate according to his selection
     */
     menuItems = [];
     
     constructor(public navCtrl: NavController, public navParams: NavParams) {
         this.menuItems = [{
             'name':'Difficulty Buckets',
             'page': DifficultyBuckets
         },{
             'name':'Learnt Words',
             'page': LearntWords
         },{
             'name':'Saved Translations',
             'page': SavedTranslations
         }];
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad Learning');
     }

     /**
     * Navigates based on the option selected by user
     * @param {Page} page The Page where the user wants to navigate
     */
     openPage(page){
         this.navCtrl.push(page);
     }

 }
