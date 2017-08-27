import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { OptionsController } from '../../providers/options';


import {ElementRef} from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the Backup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
     selector: 'page-backup',
     templateUrl: 'backup.html',
 })
 export class Backup {

     @ViewChild('fileInput') fileInput:ElementRef;
     element:any;
     file:any;

     constructor(public platform:Platform,public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController,private androidPermissions: AndroidPermissions,public alertCtrl: AlertController) {
         localStorage.setItem('hasPermission','false');
         this.requestPermission();
     }

     ionViewDidLoad() {
         var $this = this;
         console.log('ionViewDidLoad Backup');
         this.fileInput.nativeElement.addEventListener('change', (e) => {
             // console.log(this.fileInput);
             let file = this.fileInput.nativeElement.files[0];
             let textType = /text.*/;
             console.log(textType.test(file.type));
             if (textType.test(file.type)) {
                 
                 let reader = new FileReader();
                 console.log(reader);
                 reader.onload = (e) => {
                     var config = JSON.parse(reader.result);
                     if (this.opctrl.validateConfigFile(config)) {
                         this.opctrl.save(config, 'Restored configuration from file');
                         this.showAlert('Restart App','You need to restart app to apply new configuration',function(){
                             $this.platform.exitApp();
                         });
                     } else {
                         // this.opctrl.status('Corrupted File.', 2000, 100, 'danger');
                     }
                     console.log(config);
                 };
                 reader.onerror = (e) => {
                     console.log(e);
                 }
                 reader.readAsText(file);
             } else {
                 console.log('Unsupported file format.', 2000, 100, 'danger');
             }
         });
     }

     back(){
         console.log(2);
         this.opctrl.backupAll();
     }

     restore(){
         if(JSON.parse(localStorage.getItem('hasPermission'))==true)
             this.fileInput.nativeElement.click();
         else 
             this.requestPermission();
     }


     resetConfig(){
         var $this  = this;
         this.showAlert('Reset Configuration','Are you sure you want to reset all the data. Please create a backup if you want to restore your data in the future.',function(){
             $this.opctrl.resetConfig();
         });
     }

     deleteKeys(){
         var $this  = this;
         this.showAlert('Delete Keys','>Are you sure you want to remove all the keys. Please create a backup if you want to restore your keys in the future.This action is irreversible',function(){
             $this.opctrl.deleteKeys();
         });
     }

     requestPermission(){
         this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
             success =>{
                 localStorage.setItem('hasPermission','true');
             },
             error=>{localStorage.setItem('hasPermission','false');console.log(error)})
     }
     
     
     showAlert(title,message,toExecute) {
         let confirm = this.alertCtrl.create({
             title: title,
             message: message,
             buttons: [
             {
                 text: 'Disagree',
                 handler: () => {
                     console.log('Disagree clicked');
                 }
             },
             {
                 text: 'Agree',
                 handler: () => {
                     toExecute();
                 }
             }
             ]
         });
         confirm.present();
     }
 }
