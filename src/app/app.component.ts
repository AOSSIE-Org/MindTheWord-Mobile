import { Component } from '@angular/core';
import { App,Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LandingPage } from '../pages/landing/landing';
import { SettingsPage } from '../pages/settings/settings';

import { Device } from '@ionic-native/device';
import { OptionsController } from '../providers/options';


@Component({
    templateUrl: 'app.html'
})
export class MTWApp {
    rootPage:any = LandingPage;

    constructor(public app:App,platform: Platform, statusBar: StatusBar, public opctrl:OptionsController,public device:Device,splashScreen: SplashScreen,private menuCtrl:MenuController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            this.menuCtrl.enable(false);
            var device_detail = {
                'uuid':this.device.uuid,
                'platform':this.device.platform,
                'model':this.device.model
            }
            localStorage.setItem('device',JSON.stringify(device_detail));

            console.log(this.device);

        });

    }

    goToSettings(){
        this.app.getActiveNav().push(SettingsPage);
    }

    logout(){
        this.opctrl.logout().then(()=>{
            this.goToLanding();
        })
    }

    goToLanding(){
        this.app.getActiveNav().setRoot(LandingPage);
    }

}
