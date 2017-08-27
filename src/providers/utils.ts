import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase  from 'firebase';
/**
* General Utility function
*/
@Injectable()
export class Utils {


    firebaseApp: any;
    firebase: any;
    constructor() {
        this.firebase = firebase;
        this.initializeFirebaseApp();
    }

    getCurrentMonth() {
        let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let d = new Date();
        return month[d.getMonth()];
    }

    getCurrentDay() {
        let month = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let d = new Date();
        return month[d.getDay() - 1];
    }

    /**
    * Configuration to initialize the Firebase connection
    */
    initializeFirebaseApp() {
        var config = {
            apiKey: "AIzaSyBH9sF0wHfwPozo9-5HwNjg_i1XfeL-Azk",
            authDomain: "mindtheword-16735.firebaseapp.com",
            databaseURL: "https://mindtheword-16735.firebaseio.com",
            projectId: "mindtheword-16735",
            storageBucket: "mindtheword-16735.appspot.com",
            messagingSenderId: "23095186114"
        };

        this.firebase.initializeApp(config);
        this.firebaseApp = this.firebase.database();
    }

    startFrom() {
        return (input, start) => {
            if (input) {
                start = +start; //parse to int
                return input.slice(start);
            }
            return [];
        };
    }

    // localizeHtmlPage(){
    //     //Localize by replacing __MSG_***__ meta tags
    //     var objects = document.querySelectorAll('[data-translate]');
    //     for (var j = 0; j < objects.length; j++)
    //     {
    //         var obj = objects[j];

    //         var valStrH = obj.innerHTML.toString();
    //         var dataVal = obj.getAttribute('data-translate');
    //         var valNewH = chrome.i18n.getMessage(dataVal);

    //         if(valNewH != valStrH)
    //         {
    //             obj.innerHTML = valNewH;
    //         }
    //     }
    // }


    public bingLanguages = [{
        'language': 'Arabic',
        'code': 'ar'
    }, {
        'language': 'Bosnian (Latin)',
        'code': 'bs-Latn'
    }, {
        'language': 'Bulgarian',
        'code': 'bg'
    }, {
        'language': 'Catalan',
        'code': 'ca'
    }, {
        'language': 'Chinese Simplified',
        'code': 'zh-CHS'
    }, {
        'language': 'Chinese Traditional',
        'code': 'zh-CHT'
    }, {
        'language': 'Croatian',
        'code': 'hr'
    }, {
        'language': 'Czech',
        'code': 'cs'
    }, {
        'language': 'Danish',
        'code': 'da'
    }, {
        'language': 'Dutch',
        'code': 'nl'
    }, {
        'language': 'English',
        'code': 'en'
    }, {
        'language': 'Estonian',
        'code': 'et'
    }, {
        'language': 'Finnish',
        'code': 'fi'
    }, {
        'language': 'French',
        'code': 'fr'
    }, {
        'language': 'German',
        'code': 'de'
    }, {
        'language': 'Greek',
        'code': 'el'
    }, {
        'language': 'Haitian Creole',
        'code': 'ht'
    }, {
        'language': 'Hebrew',
        'code': 'he'
    }, {
        'language': 'Hindi',
        'code': 'hi'
    }, {
        'language': 'Hmong Daw',
        'code': 'mww'
    }, {
        'language': 'Hungarian',
        'code': 'hu'
    }, {
        'language': 'Indonesian',
        'code': 'id'
    }, {
        'language': 'Italian',
        'code': 'it'
    }, {
        'language': 'Japanese',
        'code': 'ja'
    }, {
        'language': 'Kiswahili',
        'code': 'sw'
    }, {
        'language': 'Klingon',
        'code': 'tlh'
    }, {
        'language': 'Klingon (pIqaD)',
        'code': 'tlh-Qaak'
    }, {
        'language': 'Korean',
        'code': 'ko'
    }, {
        'language': 'Latvian',
        'code': 'lv'
    }, {
        'language': 'Lithuanian',
        'code': 'lt'
    }, {
        'language': 'Malay',
        'code': 'ms'
    }, {
        'language': 'Maltese',
        'code': 'mt'
    }, {
        'language': 'Norwegian',
        'code': 'no'
    }, {
        'language': 'Persian',
        'code': 'fa'
    }, {
        'language': 'Polish',
        'code': 'pl'
    }, {
        'language': 'Portuguese',
        'code': 'pt'
    }, {
        'language': 'Queretaro Otomi',
        'code': 'otq'
    }, {
        'language': 'Romanian',
        'code': 'ro'
    }, {
        'language': 'Russian',
        'code': 'ru'
    }, {
        'language': 'Serbian (Cyrillic)',
        'code': 'sr-Cyrl'
    }, {
        'language': 'Serbian (Latin)',
        'code': 'sr-Latn'
    }, {
        'language': 'Slovak',
        'code': 'sk'
    }, {
        'language': 'Slovenian',
        'code': 'sl'
    }, {
        'language': 'Spanish',
        'code': 'es'
    }, {
        'language': 'Swedish',
        'code': 'sv'
    }, {
        'language': 'Thai',
        'code': 'th'
    }, {
        'language': 'Turkish',
        'code': 'tr'
    }, {
        'language': 'Ukrainian',
        'code': 'uk'
    }, {
        'language': 'Urdu',
        'code': 'ur'
    }, {
        'language': 'Vietnamese',
        'code': 'vi'
    }, {
        'language': 'Welsh',
        'code': 'cy'
    }, {
        'language': 'Yucatec Maya',
        'code': 'yua'
    }]

    public yandexLanguages = [{
        'language': 'Albanian',
        'code': 'sq'
    }, {
        'language': 'Arabian',
        'code': 'ar'
    }, {
        'language': 'Armenian',
        'code': 'hy'
    }, {
        'language': 'Azeri',
        'code': 'az'
    }, {
        'language': 'Belarusian',
        'code': 'be'
    }, {
        'language': 'Bosnian',
        'code': 'bs'
    }, {
        'language': 'Bulgarian',
        'code': 'bg'
    }, {
        'language': 'Catalan',
        'code': 'ca'
    }, {
        'language': 'Croatian',
        'code': 'hr'
    }, {
        'language': 'Czech',
        'code': 'cs'
    }, {
        'language': 'Chinese',
        'code': 'zh'
    }, {
        'language': 'Danish',
        'code': 'da'
    }, {
        'language': 'Dutch',
        'code': 'nl'
    }, {
        'language': 'English',
        'code': 'en'
    }, {
        'language': 'Esperanto',
        'code': 'eo'
    }, {
        'language': 'Estonian',
        'code': 'et'
    }, {
        'language': 'Finnish',
        'code': 'fi'
    }, {
        'language': 'French',
        'code': 'fr'
    }, {
        'language': 'Georgian',
        'code': 'ka'
    }, {
        'language': 'German',
        'code': 'de'
    }, {
        'language': 'Greek',
        'code': 'el'
    }, {
        'language': 'Hindi',
        'code': 'hi'
    }, {
        'language': 'Hebrew',
        'code': 'he'
    }, {
        'language': 'Hungarian',
        'code': 'hu'
    }, {
        'language': 'Icelandic',
        'code': 'is'
    }, {
        'language': 'Indonesian',
        'code': 'id'
    }, {
        'language': 'Italian',
        'code': 'it'
    }, {
        'language': 'Japanese',
        'code': 'ja'
    }, {
        'language': 'Korean',
        'code': 'ko'
    }, {
        'language': 'Latvian',
        'code': 'lv'
    }, {
        'language': 'Lithuanian',
        'code': 'lt'
    }, {
        'language': 'Macedonian',
        'code': 'mk'
    }, {
        'language': 'Malay',
        'code': 'ms'
    }, {
        'language': 'Maltese',
        'code': 'mt'
    }, {
        'language': 'Norwegian',
        'code': 'no'
    }, {
        'language': 'Polish',
        'code': 'pl'
    }, {
        'language': 'Portuguese',
        'code': 'pt'
    }, {
        'language': 'Romanian',
        'code': 'ro'
    }, {
        'language': 'Russian',
        'code': 'ru'
    }, {
        'language': 'Spanish',
        'code': 'es'
    }, {
        'language': 'Serbian',
        'code': 'sr'
    }, {
        'language': 'Slovak',
        'code': 'sk'
    }, {
        'language': 'Slovenian',
        'code': 'sl'
    }, {
        'language': 'Swedish',
        'code': 'sv'
    }, {
        'language': 'Thai',
        'code': 'th'
    }, {
        'language': 'Turkish',
        'code': 'tr'
    }, {
        'language': 'Ukrainian',
        'code': 'uk'
    }, {
        'language': 'Vietnamese',
        'code': 'vi'
    }];

    public googleLanguages = [{
        'language': 'Afrikaans',
        'code': 'af'
    }, {
        'language': 'Albanian',
        'code': 'sq'
    }, {
        'language': 'Arabic',
        'code': 'ar'
    }, {
        'language': 'Armenian',
        'code': 'hy'
    }, {
        'language': 'Azerbaijani',
        'code': 'az'
    }, {
        'language': 'Basque',
        'code': 'eu'
    }, {
        'language': 'Belarusian',
        'code': 'be'
    }, {
        'language': 'Bengali',
        'code': 'bn'
    }, {
        'language': 'Bosnian',
        'code': 'bs'
    }, {
        'language': 'Bulgarian',
        'code': 'bg'
    }, {
        'language': 'Catalan',
        'code': 'ca'
    }, {
        'language': 'Cebuano',
        'code': 'ceb'
    }, {
        'language': 'Chichewa',
        'code': 'ny'
    }, {
        'language': 'Chinese Simplified',
        'code': 'zh-CN'
    }, {
        'language': 'Chinese Traditional',
        'code': 'zh-TW'
    }, {
        'language': 'Croatian',
        'code': 'hr'
    }, {
        'language': 'Czech',
        'code': 'cs'
    }, {
        'language': 'Danish',
        'code': 'da'
    }, {
        'language': 'Dutch',
        'code': 'nl'
    }, {
        'language': 'English',
        'code': 'en'
    }, {
        'language': 'Esperanto',
        'code': 'eo'
    }, {
        'language': 'Estonian',
        'code': 'et'
    }, {
        'language': 'Filipino',
        'code': 'tl'
    }, {
        'language': 'Finnish',
        'code': 'fi'
    }, {
        'language': 'French',
        'code': 'fr'
    }, {
        'language': 'Galician',
        'code': 'gl'
    }, {
        'language': 'Georgian',
        'code': 'ka'
    }, {
        'language': 'German',
        'code': 'de'
    }, {
        'language': 'Greek',
        'code': 'el'
    }, {
        'language': 'Gujarati',
        'code': 'gu'
    }, {
        'language': 'Haitian Creole',
        'code': 'ht'
    }, {
        'language': 'Hausa',
        'code': 'ha'
    }, {
        'language': 'Hebrew',
        'code': 'iw'
    }, {
        'language': 'Hindi',
        'code': 'hi'
    }, {
        'language': 'Hmong',
        'code': 'hmn'
    }, {
        'language': 'Hungarian',
        'code': 'hu'
    }, {
        'language': 'Icelandic',
        'code': 'is'
    }, {
        'language': 'Igbo',
        'code': 'ig'
    }, {
        'language': 'Indonesian',
        'code': 'id'
    }, {
        'language': 'Irish',
        'code': 'ga'
    }, {
        'language': 'Italian',
        'code': 'it'
    }, {
        'language': 'Japanese',
        'code': 'ja'
    }, {
        'language': 'Javanese',
        'code': 'jw'
    }, {
        'language': 'Kannada',
        'code': 'kn'
    }, {
        'language': 'Kazakh',
        'code': 'kk'
    }, {
        'language': 'Khmer',
        'code': 'km'
    }, {
        'language': 'Korean',
        'code': 'ko'
    }, {
        'language': 'Lao',
        'code': 'lo'
    }, {
        'language': 'Latin',
        'code': 'la'
    }, {
        'language': 'Latvian',
        'code': 'lv'
    }, {
        'language': 'Lithuanian',
        'code': 'lt'
    }, {
        'language': 'Macedonian',
        'code': 'mk'
    }, {
        'language': 'Malagasy',
        'code': 'mg'
    }, {
        'language': 'Malay',
        'code': 'ms'
    }, {
        'language': 'Malayalam',
        'code': 'ml'
    }, {
        'language': 'Maltese',
        'code': 'mt'
    }, {
        'language': 'Maori',
        'code': 'mi'
    }, {
        'language': 'Marathi',
        'code': 'mr'
    }, {
        'language': 'Mongolian',
        'code': 'mn'
    }, {
        'language': 'Myanmar (Burmese)',
        'code': 'my'
    }, {
        'language': 'Nepali',
        'code': 'ne'
    }, {
        'language': 'Norwegian',
        'code': 'no'
    }, {
        'language': 'Persian',
        'code': 'fa'
    }, {
        'language': 'Polish',
        'code': 'pl'
    }, {
        'language': 'Portuguese',
        'code': 'pt'
    }, {
        'language': 'Punjabi',
        'code': 'ma'
    }, {
        'language': 'Romanian',
        'code': 'ro'
    }, {
        'language': 'Russian',
        'code': 'ru'
    }, {
        'language': 'Serbian',
        'code': 'sr'
    }, {
        'language': 'Sesotho',
        'code': 'st'
    }, {
        'language': 'Sinhala',
        'code': 'si'
    }, {
        'language': 'Slovak',
        'code': 'sk'
    }, {
        'language': 'Slovenian',
        'code': 'sl'
    }, {
        'language': 'Somali',
        'code': 'so'
    }, {
        'language': 'Spanish',
        'code': 'es'
    }, {
        'language': 'Sudanese',
        'code': 'su'
    }, {
        'language': 'Swahili',
        'code': 'sw'
    }, {
        'language': 'Swedish',
        'code': 'sv'
    }, {
        'language': 'Tajik',
        'code': 'tg'
    }, {
        'language': 'Tamil',
        'code': 'ta'
    }, {
        'language': 'Telugu',
        'code': 'te'
    }, {
        'language': 'Thai',
        'code': 'th'
    }, {
        'language': 'Turkish',
        'code': 'tr'
    }, {
        'language': 'Ukrainian',
        'code': 'uk'
    }, {
        'language': 'Urdu',
        'code': 'ur'
    }, {
        'language': 'Uzbek',
        'code': 'uz'
    }, {
        'language': 'Vietnamese',
        'code': 'vi'
    }, {
        'language': 'Welsh',
        'code': 'cy'
    }, {
        'language': 'Yiddish',
        'code': 'yi'
    }, {
        'language': 'Yoruba',
        'code': 'yo'
    }, {
        'language': 'Zulu',
        'code': 'zu'
    }];
}