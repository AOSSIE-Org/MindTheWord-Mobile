import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BlacklistPage } from '../blacklist/blacklist';
import { TranslationPage } from '../translation/translation';
import { BackupPage } from '../backup/backup';
import { LearningPage } from '../learning/learning';
import { AdvancedPage } from '../advanced/advanced';


/**
 * Generated class for the Settings page.
 *
 * This page contains options for the several settings options
 */

 @Component({
     selector: 'page-settings',
     templateUrl: 'settings.html',
 })
 export class SettingsPage {

     /**
     * Contains list of Pages where the user will navigate according to his selection
     */
     menuItems = [];

     constructor(public navCtrl: NavController, public navParams: NavParams) {
         this.menuItems = [{
             'name':'Translation',
             'page': TranslationPage
         },{
             'name':'Blacklist',
             'page': BlacklistPage
         },{
             'name':'Learning',
             'page': LearningPage
         },{
             'name':'Backup',
             'page': BackupPage
         },{
             'name':'AdvancedPage',
             'page': AdvancedPage
         }];
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad Settings');
     }

     /**
     * Navigates based on the option selected by user
     * @param {Page} page The Page where the user wants to navigate
     */
     openPage(page){
         this.navCtrl.push(page);
     }

 }
