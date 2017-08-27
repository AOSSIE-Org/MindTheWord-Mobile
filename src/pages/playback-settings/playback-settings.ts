import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OptionsController } from '../../providers/options';

/**
 * Generated class for the PlaybackSettings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-playback-settings',
 	templateUrl: 'playback-settings.html',
 })
 export class PlaybackSettings {

 	voices:any;
 	volume:any;
 	rate:any;
 	pitch:any;

 	constructor(public navCtrl: NavController, public navParams: NavParams,public opctrl:OptionsController) {
 		this.voices = [
 		"Allison",
 		"Agnes",
 		"Albert",
 		"Alex",
 		"Alice",
 		"Alva",
 		"Amelie",
 		"Anna",
 		"Bad News",
 		"Bahh",
 		"Bells",
 		"Boing",
 		"Bruce",
 		"Bubbles",
 		"Carmit",
 		"Cellos",
 		"Damayanti",
 		"Daniel",
 		"Deranged",
 		"Diego",
 		"Ellen",
 		"Fiona",
 		"Fred",
 		"Good News",
 		"Hysterical",
 		"Ioana",
 		"Joana",
 		"Junior",
 		"Kanya",
 		"Karen",
 		"Kathy",
 		"Kyoko",
 		"Laura",
 		"Lekha",
 		"Luciana",
 		"Maged",
 		"Mariska",
 		"Mei-Jia",
 		"Melina",
 		"Milena",
 		"Moira",
 		"Monica",
 		"Nora",
 		"Paulina",
 		"Pipe Organ",
 		"Princess",
 		"Ralph",
 		"Samantha",
 		"Sara",
 		"Satu",
 		"Sin-ji",
 		"Tessa",
 		"Thomas",
 		"Ting-Ting",
 		"Trinoids",
 		"Veena",
 		"Vicki",
 		"Victoria",
 		"Whisper",
 		"Xander",
 		"Yelda",
 		"Yuna",
 		"Zarvox",
 		"Zosia",
 		"Zuzana",
 		"Google Deutsch",
 		"Google US English",
 		"Google UK English Female",
 		"Google UK English Male",
 		"Google español",
 		"Google español de Estados Unidos",
 		"Google français",
 		"Google हिन्दी",
 		"Google Bahasa Indonesia",
 		"Google italiano",
 		"Google 日本語",
 		"Google 한국의",
 		"Google Nederlands",
 		"Google polski",
 		"Google português do Brasil",
 		"Google русский",
 		"Google&nbsp;普通话（中国大陆）",
 		"Google&nbsp;粤語（香港）",
 		"Google 國語（臺灣）",
 		];

 		this.volume = Number.parseFloat(this.opctrl.volume) * 10;
 		this.rate = Number.parseFloat(this.opctrl.rate) * 10;
 		this.pitch = Number.parseFloat(this.opctrl.pitch) * 10;
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad PlaybackSettings');
 	}

 	changePlaybackOptions(){
 		this.opctrl.volume = this.volume / 10;
 		this.opctrl.rate = this.rate / 10;
 		this.opctrl.pitch = this.pitch / 10;
 	}
 }
