import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OptionsController } from '../../providers/options';

/**
 * Generated class for the NewPattern page.
 *
 * This pages contains various inputs for user to create new pattern
 */

 @Component({
 	selector: 'page-new-pattern',
 	templateUrl: 'new-pattern.html',
 })
 export class NewPatternPage {

 	JSON:any;
 	constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController) {
 		this.JSON = JSON;
 		this.opctrl.translator = '';
 		this.opctrl.percentage = '';
 		this.opctrl.srcLang = {
 			'code':'',
 			'language':''
 		};
 		this.opctrl.targetLang = {
 			'code':'',
 			'language':''
 		};
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad NewPattern');
 	}

 }
