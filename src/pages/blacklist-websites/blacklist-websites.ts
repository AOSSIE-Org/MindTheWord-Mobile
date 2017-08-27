import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the BlacklistWebsites page.
 *
 * This page displays a list of all websites which have been blacklisted
 */

 @Component({
     selector: 'page-blacklist-websites',
     templateUrl: 'blacklist-websites.html',
 })
 export class BlacklistWebsites {

     constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController,public alertCtrl: AlertController) {
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad BlacklistWebsites');
     }

     /**
     * Opens a dialog box to prompt user to enter new website url and adds to the blacklist website list
     */
     add(){
         let prompt = this.alertCtrl.create({
             title: 'New Blacklist Website',
             message: "",
             inputs: [
             {
                 name: 'new_blacklist_website',
                 placeholder: 'Website'
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
                     this.opctrl.newBlacklistWebsite = data['new_blacklist_website'];
                     this.opctrl.addBlackListedWebsite();
                 }
             }
             ]
         });
         prompt.present();
     }
 }
