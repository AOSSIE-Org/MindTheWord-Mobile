import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DifficultyBuckets } from '../difficulty-buckets/difficulty-buckets';
import { LearntWords } from '../learnt-words/learnt-words';
import { SavedTranslations } from '../saved-translations/saved-translations';
/**
 * Generated class for the Learning page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
     selector: 'page-learning',
     templateUrl: 'learning.html',
 })
 export class Learning {

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

     openPage(page){
         this.navCtrl.push(page);
     }

 }
