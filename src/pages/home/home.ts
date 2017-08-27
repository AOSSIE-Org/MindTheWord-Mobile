import { Component } from '@angular/core';
import { NavController,Platform,MenuController,LoadingController } from 'ionic-angular';
import { OptionsController } from '../../providers/options';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NewPatternPage } from '../new-pattern/new-pattern';


import { AlertController } from 'ionic-angular';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Clipboard } from '@ionic-native/clipboard';

/**
* Home Page which shows list of patterns added by the user and an input box where the user can enter the url 
*/
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    /**
    * To store the url entered by the user
    */
    url:string;

    /**
    * A flag variable which keeps a check if clipboard contains a valid url
    */
    hasURL : boolean;

    /**
    * @param {InAppBrowser} iab InAppBrowser instance
    * @param {Clipboard} clipboard Clipboard instance
    */
    constructor(platform: Platform,public navCtrl: NavController,public iab: InAppBrowser,public clipboard: Clipboard,private menuCtrl:MenuController,public opctrl:OptionsController,public alertCtrl: AlertController,public http:Http,public loadingCtrl: LoadingController) {
        this.menuCtrl.enable(true);
        this.url='https://en.wikipedia.org/wiki/English_Wikipedia';

        platform.ready().then(() => {
            this.opctrl.setup();
            this.clipboard.paste().then((resolve: string) => {
                if(resolve && this.isURL(resolve)) {
                    this.showConfirm(resolve);
                }
            });

            platform.pause.subscribe(() => {
                console.log('[INFO] App paused');
            });

            platform.resume.subscribe(() => {
                console.log('[INFO] App resumed');
                console.log(this.clipboard);
                this.clipboard.paste().then((resolve: string) => {
                    if(resolve && this.isURL(resolve)) {
                        console.count("clipboard");
                        this.showConfirm(resolve);
                    }
                });
            });
        });
    }

    /**
    * Navigates to a page to add a new pattern
    */
    goToNewPatternPage(){
        this.navCtrl.push(NewPatternPage)
    }

    /**
    * Configures and starts the [InAppBrowser] {@link https://ionicframework.com/docs/native/in-app-browser/}
    * 
    * It loads the script mtw.js and inserts in the webpage
    */
    search(){
        if (!this.url.startsWith('http'))
            this.url = 'http://' + this.url;
        let browser = this.iab.create(this.url,'_blank', 'location=yes');
        browser.on('loadstop').subscribe(

            ()=>{
                this.http.get('assets/styles/MTWStyles.css')
                .toPromise()
                .then(
                    response=>{
                        browser.insertCSS({
                            code:response.text()
                        });
                    },
                    err=>{
                        console.log(err)
                    });

                if(localStorage.user){
                    browser.executeScript({
                        code: 'localStorage.setItem("device",'+JSON.stringify(localStorage.device)+');\
                        localStorage.setItem("user",'+JSON.stringify(localStorage.user)+');'
                    });
                }else{
                    browser.executeScript({
                        code: 'localStorage.setItem("device",'+JSON.stringify(localStorage.device)+');\
                        localStorage.setItem("deviceID",'+JSON.stringify(localStorage.deviceID)+');'
                    });
                }

                this.http.get('build/mtw.js')
                .toPromise()
                .then(
                    response=>{
                        browser.executeScript({
                            code:response.text()
                        });
                    },
                    err=>{
                        console.log(err)
                    });
            },
            (err)=>{console.log(err)});

        browser.show();
    }

    /**
    * Opens the dialog box in case user has copied a url from any external source (e.g. chrome)
    */
    showConfirm(resolve) {
        let confirm = this.alertCtrl.create({
            title: '',
            message: 'Do you want to search for the copied url?',
            buttons: [
            {
                text: 'Nah',
                handler: () => {
                    this.clipboard.copy('').then(() => {
                        this.url = '';
                    }, () => {
                        // error
                    }); 
                    // this.hasURL = false;
                }
            },
            {
                text: 'Ok',
                handler: () => {
                    this.hasURL = true;
                    this.url = resolve;
                }
            }
            ]
        });
        confirm.present();
    }

    /**
    * Checks for a valid url
    * @param {string} str String which contains url
    */
    isURL(str:string) {
        //Credit: http://stackoverflow.com/a/3809435
        var expr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
        var regex = new RegExp(expr);
        var result = str.match(regex);
        if(result) return true;
        return false;
    };

}
