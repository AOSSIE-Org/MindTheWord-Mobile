import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Blacklist } from '../blacklist/blacklist';
import { Translation } from '../translation/translation';
import { Backup } from '../backup/backup';
import { Learning } from '../learning/learning';
import { Advanced } from '../advanced/advanced';


/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
     selector: 'page-settings',
     templateUrl: 'settings.html',
 })
 export class SettingsPage {

     menuItems = [];
     constructor(public navCtrl: NavController, public navParams: NavParams) {
         this.menuItems = [{
             'name':'Translation',
             'page': Translation
         },{
             'name':'Blacklist',
             'page': Blacklist
         },{
             'name':'Learning',
             'page': Learning
         },{
             'name':'Backup',
             'page': Backup
         },{
             'name':'Advanced',
             'page': Advanced
         }];
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad Settings');
     }

     openPage(page){
         this.navCtrl.push(page);
     }

 }
