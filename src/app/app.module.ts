import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MTWApp } from './app.component';
import { Utils } from '../providers/utils';
import { OptionsController } from '../providers/options';
import { Device } from '@ionic-native/device';


import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { NewPatternPage } from '../pages/new-pattern/new-pattern';
import { SettingsPage } from '../pages/settings/settings';
import { Blacklist } from '../pages/blacklist/blacklist';
import { Translation } from '../pages/translation/translation';
import { Backup } from '../pages/backup/backup';
import { Learning } from '../pages/learning/learning';
import { Advanced } from '../pages/advanced/advanced';
import { BlacklistWebsites } from '../pages/blacklist-websites/blacklist-websites';
import { BlacklistWords } from '../pages/blacklist-words/blacklist-words';
import { DifficultyBuckets } from '../pages/difficulty-buckets/difficulty-buckets';
import { NewDifficultyWord } from '../pages/new-difficulty-word/new-difficulty-word';
import { UserDefinedTranslations } from '../pages/user-defined-translations/user-defined-translations';
import { PlaybackSettings } from '../pages/playback-settings/playback-settings';
import { LearntWords } from '../pages/learnt-words/learnt-words';
import { SavedTranslations } from '../pages/saved-translations/saved-translations';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ColorPickerModule } from 'angular2-color-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
import { GooglePlus } from '@ionic-native/google-plus';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpModule } from '@angular/http';
import { Clipboard } from '@ionic-native/clipboard';

// import { AngularFireModule } from 'angularfire2';

// const firebaseConfig = {
//                 apiKey: "AIzaSyDMX_jOW-Yfu6R48j_A6ISwVtc0d2gB7qo",
//                 authDomain: "mindtheword-16735.firebaseapp.com",
//                 databaseURL: "https://mindtheword-16735.firebaseio.com",
//                 projectId: "mindtheword-16735",
//                 storageBucket: "mindtheword-16735.appspot.com",
//                 messagingSenderId: "23095186114"
//               };


@NgModule({
  declarations: [
    MTWApp,
    HomePage,
    LandingPage,
    NewPatternPage,
    SettingsPage,
    Blacklist,
    Translation,
    Backup,
    Advanced,
    BlacklistWebsites,
    BlacklistWords,
    DifficultyBuckets,
    LearntWords,
    SavedTranslations,
    Learning,
    NewDifficultyWord,
    UserDefinedTranslations,
    PlaybackSettings
  ],
  imports: [
    BrowserModule,
    ColorPickerModule,
    HttpModule,
    IonicModule.forRoot(MTWApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MTWApp,
    HomePage,
    LandingPage,
    NewPatternPage,
    SettingsPage,
    Blacklist,
    Translation,
    Backup,
    Advanced,
    BlacklistWebsites,
    BlacklistWords,
    DifficultyBuckets,
    LearntWords,
    SavedTranslations,
    Learning,
    NewDifficultyWord,
    UserDefinedTranslations,
    PlaybackSettings
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Utils,
    OptionsController,
    Device,
    FileTransfer,
    File,
    AndroidPermissions,
    InAppBrowser,
    Clipboard,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]

})
export class AppModule {}
