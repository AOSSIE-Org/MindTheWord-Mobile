import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import { Utils } from './utils';
import { ToastController,LoadingController } from 'ionic-angular';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';
import { GooglePlus } from '@ionic-native/google-plus';


/** Class for option page angular controller */
@Injectable()
export class OptionsController {

    user:any;
    patterns: any;
    logMessages: any;
    key: any;
    blacklistedWords: any;
    learntWords: any;
    learntWordPage: any;
    blacklistedWebsites: any;
    blacklistWordPage: any;
    difficultyBucketsWordPage: any;
    blacklistWebsitePage: any;
    translator: any;
    userDefinedTranslationList: any;
    userDefinedTranslations: any;
    userDefinedTranslationPage: any;
    yandexTranslatorApiKey: any;
    googleTranslatorApiKey: any;
    bingTranslatorApiKey: any;
    minWordLength: any;
    ngramMin: any;
    ngramMax: any;
    cssOptions: any;
    percentage: any;
    original: any;
    translated: any;
    newBlacklistWord: any;
    newlearntWord: any;
    newBlacklistWebsite: any;
    voiceName: any;
    pitch: any;
    volume: any;
    rate: any;
    languages: any;
    bingClientId: any;
    difficultyBuckets: any;
    difficultyBucketsWords: any;
    newDifficultyBucketWord: any;
    newDifficultyBucketWordLevel: any;
    savedTranslations: any;
    savedTranslationList: any;
    savedTranslationPage: any;
    userDefinedOnly: any;
    doNotTranslate: any;
    stats: any;
    activationToggles: any;
    wordToggles: any;
    translatedWordsForQuiz: any;
    quizAnswers: any;
    pageReload: any;
    keyAlert: any;
    currentMonth: any;
    currentDay: any;
    numberOfApiCalls: any;
    yandexDailyLimit: any;
    yandexMonthlyLimit: any;
    translatorService: any;
    translatedWordStyle: any;
    autoBlacklist: any;
    oneWordTranslation: any;
    randomTranslatedWordsForQuiz: any;
    translatedWordsExist: any;
    quizOptions: any;
    date: any;
    srcLang: any;
    targetLang: any;
    newLearntWord: any;
    textColor: any;
    backColor: any;
    localData: any;
    /**
     * Initialize options page data and jQuery
     * @constructor
     * @param {GooglePlus} googlePlus - GooglePlus instance
     * @param {Utils} utils - Utils (contains utility functions) instance
     */
    constructor(public utils: Utils, public toastCtrl: ToastController, public loadingCtrl: LoadingController,public googlePlus: GooglePlus) {
        this.user = false;
        // this.fileTransfer = this.transfer.create();
        // this.$rootScope = $rootScope;
        // this.$cordovaFileTransfer = $cordovaFileTransfer;
        // this.$timeout = $timeout;
        // this.$scope = $scope;

        // this.yandexDailyLimit;
        // this.yandexMonthlyLimit;


    }

    /**
    * Connects to Firebase Database and initializes the instance members 
    */
    getData() {
        var $this = this;
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        this.utils.firebaseApp.ref(this.getUrl()).once('value').then(function(snapshot) {
            loading.dismiss();
            var info = snapshot.val();
            console.log(info, $this.getUrl());
            var data = info.options;
            $this.localData = data;
            $this.logMessages = JSON.parse(data.logMessages);
            $this.patterns = JSON.parse(data.savedPatterns);
            $this.key = data.yandexTranslatorApiKey;

            $this.blacklistedWords = data.userBlacklistedWords.slice(1, -1).split('|').filter(function(n) {
                return n !== '';
            });
            $this.blacklistedWebsites = data.blacklist.slice(1, -1).split('|').filter(function(n) {
                return n !== '';
            });

            $this.translatorService = data.translatorService;
            $this.userDefinedTranslations = JSON.parse(data.userDefinedTranslations);
            $this.userDefinedTranslationList = $this.toList($this.userDefinedTranslations);
            $this.yandexTranslatorApiKey = data.yandexTranslatorApiKey;
            $this.googleTranslatorApiKey = data.googleTranslatorApiKey;
            $this.bingTranslatorApiKey = data.bingTranslatorApiKey;
            $this.minWordLength = Number.parseInt(data.minimumSourceWordLength);
            $this.ngramMin = Number.parseInt(data.ngramMin);
            $this.ngramMax = Number.parseInt(data.ngramMax);
            $this.cssOptions = data.translatedWordStyle.split(';');
            $this.translatedWordStyle = data.translatedWordStyle;
            let playbackOptions = JSON.parse(data.playbackOptions);
            $this.voiceName = playbackOptions.voiceName;
            $this.pitch = Number.parseFloat(playbackOptions.pitch);
            $this.volume = Number.parseFloat(playbackOptions.volume);
            $this.rate = Number.parseFloat(playbackOptions.rate);
            $this.learntWords = data.learntWords.slice(1, -1).split('|');
            //remove empty strings from the array in case learntWords is empty
            $this.learntWords = $this.learntWords.filter(function(n) {
                return n !== '';
            });
            $this.difficultyBuckets = JSON.parse(data.difficultyBuckets);
            $this.difficultyBucketsWords = Object.keys($this.difficultyBuckets);
            $this.savedTranslations = JSON.parse(data.savedTranslations);
            $this.savedTranslationList = $this.toList($this.savedTranslations);
            $this.userDefinedOnly = data.userDefinedOnly;
            $this.doNotTranslate = data.doNotTranslate;
            $this.stats = data.stats;
            console.log($this.stats['translatorWiseWordCount'][0]);
            // $this.stats['translatorWiseWordCount'] = JSON.parse($this.stats['translatorWiseWordCount']);
            $this.activationToggles = Number.parseInt(data.activationToggles);
            $this.wordToggles = Number.parseInt(data.wordToggles);
            $this.autoBlacklist = data.autoBlacklist;
            $this.translatedWordsForQuiz = JSON.parse(data.translatedWordsForQuiz);
            $this.oneWordTranslation = data.oneWordTranslation;
            //randomly selected 10 words for the quiz
            $this.randomTranslatedWordsForQuiz = $this.randomlySelectTenWords($this.translatedWordsForQuiz);
            $this.translatedWordsExist = Object.keys($this.randomTranslatedWordsForQuiz).length === 0 ? false : true;
            $this.quizOptions = $this.getShuffledValues($this.randomTranslatedWordsForQuiz);
            $this.date = new Date();
            $this.yandexMonthlyLimit = $this.getYandexLimit('monthly');
            $this.yandexDailyLimit = $this.getYandexLimit('daily');
            $this.setKeyAlert();
            $this.intializeStyleOptions();

        });
    }

    /**
    * Calculates the limit for Yandex translation
    * @param {string} period Period for which the count must be made
    */
    getYandexLimit(period:string) {
        if (this.stats['translatorWiseWordCount'][0][this.currentMonth]) {
            var limit;
            switch (period) {
                case 'monthly':
                    limit = (this.stats['translatorWiseWordCount'][0][this.currentMonth]['Yandex'][2] / 10000000) * 100;
                    break;
                case 'daily':
                    limit = (this.stats['translatorWiseWordCount'][1][this.currentDay]['Yandex'][2] / 1000000) * 100;
                    break;
            }
            if (limit > 100) {
                return 100.00;
            } else
                return parseFloat(limit).toFixed(2);
        }
    }

    getShuffledValues(obj) {
        var dataArray = Object.keys(obj).map(function(k) {
            return obj[k];
        });
        for (var i = dataArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = dataArray[i];
            dataArray[i] = dataArray[j];
            dataArray[j] = temp;
        }
        return dataArray;
    }


    /**
    * Initiliazes the instance members on startup
    */
    setup() {
        this.patterns = [];
        this.logMessages = [];
        this.key = '';
        this.blacklistedWords = [];
        this.learntWords = [];
        this.learntWordPage = 0;
        this.blacklistedWebsites = [];
        this.blacklistWordPage = 0;
        this.difficultyBucketsWordPage = 0;
        this.blacklistWebsitePage = 0;
        this.translator = '';
        this.userDefinedTranslationList = [];
        this.userDefinedTranslations = {};
        this.userDefinedTranslationPage = 0;
        this.yandexTranslatorApiKey = '';
        this.googleTranslatorApiKey = '';
        this.bingTranslatorApiKey = '';
        this.minWordLength = 3;
        this.ngramMin = 1;
        this.ngramMax = 1;
        this.cssOptions = [];
        this.percentage = '15';
        this.original = '';
        this.translated = '';
        this.newBlacklistWord = '';
        this.newlearntWord = '';
        this.newBlacklistWebsite = '';
        this.voiceName = 'Google US English';
        this.pitch = 1.0;
        this.volume = 0.5;
        this.rate = 1.0;
        this.languages = [];
        this.bingClientId = '';
        this.difficultyBuckets = JSON.parse('{}');
        this.difficultyBucketsWords = [];
        this.newDifficultyBucketWord = '';
        this.newDifficultyBucketWordLevel = '';
        this.savedTranslations = {};
        this.savedTranslationList = [];
        this.savedTranslationPage = 0;
        this.userDefinedOnly = false;
        this.doNotTranslate = false;
        this.stats = {};
        this.activationToggles = 0;
        this.wordToggles = 0;
        this.translatedWordsForQuiz = {};
        this.quizAnswers = [];
        this.pageReload = function() {
            window.location.reload(true);
        };
        this.keyAlert = false;
        this.numberOfApiCalls = {};
        this.currentMonth = this.utils.getCurrentMonth();
        this.currentDay = this.utils.getCurrentDay();
        if (!localStorage.user) {
            this.firebaseConfig();
        }
        this.getData();
        // this.setup();
        this.handleNetworkError();


        // this.$rootScope.opctrl = this;
        // this.$rootScope.title = "Mind The Word";
        //  this.$timeout(() => {
        //   this.$rootScope.$apply();
        //   this.$scope.$apply();
        // });
        // localizeHtmlPage();
        // $(document).ready(function(){
        //   setTimeout(function(){


        //   $('.button-collapse').sideNav({
        //             menuWidth: 300, // Default is 300
        //             edge: 'left', // Choose the horizontal origin
        //             closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        //             draggable: true
        //         });
        // },1000);
        // });

        // // $('#text-colorpicker').colorpicker().on('changeColor', (data) => {
        // //   this.setTextColor(data);
        // // });
        // // $('#bg-colorpicker').colorpicker().on('changeColor', (data) => {
        // //   this.setBackgroundColor(data);
        // // });
        // $(function () {
        //   // $('[data-toggle="tooltip"]').tooltip();
        // });
    }



    /**
    * Function to show alert at certain status checks
    * @param {string} text Text to put in the status element
    * @param {Number} duration Duration of the status
    * @param {Number} fade Duration for the fade
    * @param {string} type Status type
    */
    status(text, duration, fade, type) {
        (function(text, duration, fade) {
            var status = document.createElement('div');
            status.className = 'alert alert-' + type;
            status.innerText = text;
            document.getElementById('status').appendChild(status);

            setTimeout(() => {
                var opacity = 1,
                    ntrvl = setInterval(() => {
                        if (opacity <= 0.01) {
                            clearInterval(ntrvl);
                            document.getElementById('status').removeChild(status);
                        }
                        status.style.opacity = opacity.toString();
                        opacity -= (1 / fade);
                    }, 1);
            }, (duration - fade));
        })(text, duration, fade);
    }

    /**
    * Function to save data to Firebase Database and show alert
    * @param {Object} data Data to be updated
    * @param {string} successMessage Message to be displayed after updation
    */
    save(data, successMessage) {
        var $this = this;
        $this.utils.firebaseApp.ref(this.getUrl() + '/options/').update(data).then(function() {
            // $('.modal').modal('close');
            $this.toastCtrl.create({
                message: successMessage,
                duration: 1000
            }).present();
        });
        // chrome.storage.local.set(data, (error) => {
        //   if (error) {
        //     this.status('Error Occurred. Please refresh.', 1000, 100, 'danger');
        //   } else {
        //     this.status(successMessage, 1000, 100, 'success');
        //   }
        // });
    }

    range(number) {
        return new Array(Math.ceil(number / 4));
    }

    hashRange(hash) {
        return new Array(Math.ceil((Object.keys(hash).length) / 4));
    }

    randomlySelectTenWords(translatedWords) {
        var keys = Object.keys(translatedWords);
        this.translatedWordsExist = keys.length === 0 ? false : true;
        var result = {};
        for (var i = 0; i < 10; i++) {
            let randomKey = keys[Math.round(Math.random() * (keys.length - 0) + 0)];
            if (typeof randomKey !== 'undefined') {
                result[randomKey] = translatedWords[randomKey];
            }
            let index = keys.indexOf(randomKey);
            if (index > -1) {
                keys.splice(index, 1);
            }
        }
        return result;
    }

    /*****************************PATTERN FUNCTIONS*****************************/

    activatePattern(index) {
        if (this.hasKey(this.patterns[index][4])) {
            this.status('You do not have a key to for the translator', 2000, 100, 'danger');
        } else {
            this.deactivatePatterns();
            this.patterns[index][3] = true;
            this.userDefinedOnly = false;
            this.doNotTranslate = false;
            this.translatorService = this.patterns[index][4];
            this.save({
                translatorService: this.patterns[index][4],
                translationProbability: this.patterns[index][2],
                sourceLanguage: this.patterns[index][0][0],
                targetLanguage: this.patterns[index][1][0],
                savedPatterns: JSON.stringify(this.patterns),
                userDefinedOnly: false,
                doNotTranslate: false
            }, 'Activated Pattern');
        }
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
    }

    createPattern() {
        if (this.srcLang === undefined || this.targetLang === undefined) {
            this.status('Please select a valid language', 1000, 100, 'danger');
        } else {
            var patterns = this.patterns,
                src = [],
                trg = [],
                prb,
                duplicateInput = false, //to check duplicate patterns
                translator = this.translator;

            // src[0] = document.getElementById('srcLang');
            src[0] = JSON.parse(this.srcLang)['code'];
            src[1] = JSON.parse(this.srcLang)['language'];
            // trg[0] = document.getElementById('targetLang');
            trg[0] = JSON.parse(this.targetLang)['code'];
            trg[1] = JSON.parse(this.targetLang)['language'];
            prb = this.percentage;

            for (var index in patterns) {
                if (patterns[index][0][0] === src[0] && patterns[index][1][0] === trg[0] && patterns[index][2] === prb && patterns[index][4] === translator) {
                    duplicateInput = true;
                    this.status('Pattern already exists', 1000, 100, 'danger');
                }
            }
            if (duplicateInput === false) {
                this.deactivatePatterns();
                this.doNotTranslate = false;
                this.userDefinedOnly = false;
                console.log(this.patterns);
                this.patterns.push([
                    [src[0], src[1]],
                    [trg[0], trg[1]],
                    prb,
                    true,
                    translator,
                    0
                ]);
                this.translatorService = translator;
                // this.$timeout(() => {
                //   this.$scope.$apply();
                // });
                this.save({
                    savedPatterns: JSON.stringify(this.patterns),
                    doNotTranslate: false,
                    userDefinedOnly: false,
                    translatorService: translator,
                    translationProbability: prb,
                    sourceLanguage: src[0],
                    targetLanguage: trg[0]
                }, 'Created New Pattern');
            }
        }
    }

    deletePattern(index, event) {
        event.stopPropagation();
        var activatedPattern = -1;
        for (let i in this.patterns) {
            if (this.patterns[i][3] === true) {
                activatedPattern = Number(i);
            }
        }
        if (index === activatedPattern) {
            if (this.oneWordTranslation) {
                this.toggleOneWordTranslation();
            }
            this.deleteActivationData();
        }
        this.patterns.splice(index, 1);

        this.save({
            savedPatterns: JSON.stringify(this.patterns)
        }, 'Deleted Pattern');
    }

    deleteActivationData() {
        this.translatorService = '';
        // using chrome storage because we don't want any message to be displayed
        this.utils.firebaseApp.ref(this.getUrl() + '/options/').update({
            translatorService: '',
            translationProbability: '',
            sourceLanguage: '',
            targetLanguage: ''
        });
    }

    changeTranslator() {
        switch (this.translator) {
            case 'Yandex':
                this.languages = this.utils.yandexLanguages;
                break;
            case 'Google':
                this.languages = this.utils.googleLanguages;
                break;
            case 'Bing':
                this.languages = this.utils.bingLanguages;
                break;
            default:
                this.key = '';
        }
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
    }

    changeApiKey(translator) {
        var stats = this.stats;
        switch (translator) {
            case 'Yandex':
                if (/^\s*$/.test(this.yandexTranslatorApiKey) && this.translatorService === 'Yandex') {
                    this.deactivatePatterns();
                    this.toggleDoNotTranslate();
                }
                if (stats['translatorWiseWordCount'][0][this.currentMonth]) {
                    stats['translatorWiseWordCount'][0][this.currentMonth]['Yandex'][2] = 0;
                    stats['translatorWiseWordCount'][1][this.currentDay]['Yandex'][2] = 0;
                }
                /* split is used to remove the extra strings that get added
                at the ended of the copied Yandex key*/
                this.save({
                    yandexTranslatorApiKey: this.yandexTranslatorApiKey.split(' ')[0],
                    'stats': stats
                }, 'Updated Yandex API Key');
                break;
            case 'Google':
                if (/^\s*$/.test(this.googleTranslatorApiKey) && this.translatorService === 'Google') {
                    this.deactivatePatterns();
                    this.toggleDoNotTranslate();
                }
                if (stats['translatorWiseWordCount'][0][this.currentMonth]) {
                    stats['translatorWiseWordCount'][0][this.currentMonth]['Google'][2] = 0;
                    stats['translatorWiseWordCount'][1][this.currentDay]['Google'][2] = 0;
                }
                this.save({
                    googleTranslatorApiKey: this.googleTranslatorApiKey,
                    'stats': stats
                }, 'Updated Google API key');
                break;
            case 'Bing':
                if ((/^\s*$/.test(this.bingTranslatorApiKey.clientId) || /^\s*$/.test(this.bingTranslatorApiKey.clientSecret)) && this.translatorService === 'Bing') {
                    this.deactivatePatterns();
                    this.toggleDoNotTranslate();
                }
                this.save({
                    bingTranslatorApiKey: this.bingTranslatorApiKey
                }, 'Updated Bing API Key');
                break;
            default:
                console.error('No such translator supported');
        }
    }

    deactivatePatterns() {
        for (let i in this.patterns) {
            this.patterns[i][3] = false;
        }
    }

    toggleDoNotTranslate() {
        this.deactivatePatterns();
        this.doNotTranslate = true;
        this.userDefinedOnly = false;
        this.oneWordTranslation = false;
        this.save({
            translatorService: '',
            translationProbability: '',
            sourceLanguage: '',
            targetLanguage: '',
            savedPatterns: JSON.stringify(this.patterns),
            doNotTranslate: true,
            userDefinedOnly: false,
            oneWordTranslation: false
        }, 'Turned off Translations');
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
    }

    toggleUserDefinedOnly() {
        this.deactivatePatterns();
        this.userDefinedOnly = true;
        this.doNotTranslate = false;
        this.oneWordTranslation = false;
        this.save({
            translatorService: '',
            translationProbability: '',
            sourceLanguage: '',
            targetLanguage: '',
            savedPatterns: JSON.stringify(this.patterns),
            doNotTranslate: false,
            userDefinedOnly: true,
            oneWordTranslation: false
        }, 'User Defined Transltions only');
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
    }

    toggleOneWordTranslation() {
        if (this.translatorService === '') {
            this.status('Please select a Pattern', 1000, 100, 'danger');
        } else {
            this.userDefinedOnly = false;
            this.doNotTranslate = false;
            this.oneWordTranslation = !this.oneWordTranslation;
            this.save({
                doNotTranslate: false,
                userDefinedOnly: false,
                oneWordTranslation: this.oneWordTranslation
            }, 'Toggle one word per sentence');
            // this.$timeout(() => {
            //   this.$scope.$apply();
            // });
        }
    }

    setKeyAlert() {
        switch (this.translatorService) {
            case 'Google':
                if (this.googleTranslatorApiKey === '') {
                    this.keyAlert = true;
                }
                break;
            case 'Yandex':
                if (this.yandexTranslatorApiKey === '') {
                    this.keyAlert = true;
                }
                break;
            case 'Bing':
                if (this.bingTranslatorApiKey === '') {
                    this.keyAlert = true;
                }
                break;
        }
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
    }

    hasKey(translator) {
        switch (translator) {
            case 'Google':
                return /^\s*$/.test(this.googleTranslatorApiKey);
            case 'Yandex':
                return /^\s*$/.test(this.yandexTranslatorApiKey);
            case 'Bing':
                return /^\s*$/.test(this.bingTranslatorApiKey.clientId) && /^\s*$/.test(this.bingTranslatorApiKey.clientId);
            default:

        }
    }

    noKeys() {
        if (!/^\s*$/.test(this.googleTranslatorApiKey) || !/^\s*$/.test(this.yandexTranslatorApiKey) || !(/^\s*$/.test(this.bingTranslatorApiKey.clientId) || /^\s*$/.test(this.bingTranslatorApiKey.clientSecret))) {
            return false;
        }
        return true;
    }
    /******************************************************************************/

    updatePlaybackOptions() {
        var playbackOpts = JSON.stringify({
            'volume': this.volume,
            'rate': this.rate,
            'voiceName': this.voiceName,
            'pitch': this.pitch
        });
        this.save({
            playbackOptions: playbackOpts
        }, 'Updated Playback Options');
    }

    /************************ BLACKLISTING FUNCTIONS ****************************/

    addBlackListedWord() {
        if (/^\s*$/.test(this.newBlacklistWord) === false && this.blacklistedWords.indexOf(this.newBlacklistWord) === -1) {
            this.blacklistedWords.push(this.newBlacklistWord.trim());
            this.newBlacklistWord = '';
            this.blacklistWordPage = this.range(this.blacklistedWords.length).length - 1;
            // this.$timeout(() => {
            //   this.$scope.$apply();
            // });
            this.save({
                userBlacklistedWords: '(' + this.blacklistedWords.join('|') + ')'
            }, 'Blacklisted Word');
        }
    }

    removeBlackListedWord(word) {
        this.blacklistedWords.splice(this.blacklistedWords.indexOf(word), 1);
        // check if the word is last on the page
        if (this.blacklistedWords.length % 4 === 0) {
            this.blacklistWordPage -= 1;
        }
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
        this.save({
            userBlacklistedWords: '(' + this.blacklistedWords.join('|') + ')'
        }, 'Whitelisted Word');
    }

    addBlackListedWebsite() {
        console.log(this.newBlacklistWebsite);
        if (/^\s*$/.test(this.newBlacklistWebsite) === false && this.blacklistedWebsites.indexOf(this.newBlacklistWebsite) === -1) {
            this.blacklistedWebsites.push(this.newBlacklistWebsite.trim());
            this.newBlacklistWebsite = '';
            this.blacklistWebsitePage = this.range(this.blacklistedWebsites.length).length - 1; //set to last page
            // this.$timeout(() => {
            //   this.$scope.$apply();
            // });
            this.save({
                blacklist: '(' + this.blacklistedWebsites.join('|') + ')'
            }, 'Blacklisted Website');
        }
    }

    removeBlackListedWebsite(website) {
        this.blacklistedWebsites.splice(this.blacklistedWebsites.indexOf(website), 1);
        // check if the website is last on the page
        if (this.blacklistedWebsites.length % 4 === 0) {
            this.blacklistWebsitePage -= 1;
        }
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
        this.save({
            blacklist: '(' + this.blacklistedWebsites.join('|') + ')'
        }, 'Whitelisted Website');
    }

    updateWordToggles() {
        this.save({
            wordToggles: this.wordToggles
        }, 'Updated Maximum Word Toggles');
    }

    updateActivationToggles() {
        this.save({
            activationToggles: this.activationToggles
        }, 'Updated Maximum Activation Toggles');
    }

    setAutoBlacklist(value) {
        this.autoBlacklist = value;
        this.save({
            autoBlacklist: value
        }, 'Toggled Automatic Blacklisting');
    }

    /*****************************************************************************/
    /************************ DIFFICULTY BUCKET FUNCTIONS ****************************/

    addWordToDifficultyBucket() {
        if (/^\s*$/.test(this.newDifficultyBucketWord) === false) {
            switch (this.newDifficultyBucketWordLevel) {
                case 'Easy':
                    this.difficultyBuckets[this.newDifficultyBucketWord] = 'e';
                    break;
                case 'Normal':
                    this.difficultyBuckets[this.newDifficultyBucketWord] = 'n';
                    break;
                case 'Hard':
                    this.difficultyBuckets[this.newDifficultyBucketWord] = 'h';
                    break;
            }
            this.newDifficultyBucketWord = '';
            this.newDifficultyBucketWordLevel = '';
            this.difficultyBucketsWords = Object.keys(this.difficultyBuckets);
            this.difficultyBucketsWordPage = this.range(this.difficultyBucketsWords.length).length - 1; //set to last page
            // this.$timeout(() => {
            //   this.$scope.$apply();
            // });
            this.save({
                difficultyBuckets: JSON.stringify(this.difficultyBuckets)
            }, 'Word added to difficulty bucket');
        }
    }

    removeWordFromDifficultyBucket(word) {
        let difficultyBuckets = this.difficultyBuckets;
        Object.keys(difficultyBuckets).forEach(function(key) {
            if (key === word) {
                delete difficultyBuckets[word];
            }
        });

        this.difficultyBucketsWords = Object.keys(this.difficultyBuckets);

        // check if the word is last on the page
        if (Object.keys(difficultyBuckets).length % 4 === 0) {
            this.difficultyBucketsWordPage -= 1;
        }

        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
        this.save({
                difficultyBuckets: JSON.stringify(difficultyBuckets)
            },
            'Deleted word from difficulty bucket');
    }

    /*****************************************************************************/
    /************************ USER TRANSLATION FUNCTIONS ****************************/

    toList(data) {
        let list = [];
        for (let i in data) {
            list.push([i, data[i]]);
        }
        return list;
    }

    addUserDefinedTranslation() {
        if (/^\s*$/.test(this.original) === false && /^\s*$/.test(this.translated) === false) {
            this.userDefinedTranslations[this.original] = this.translated;
            this.userDefinedTranslationList = this.toList(this.userDefinedTranslations);
            this.userDefinedTranslationPage = this.range(this.userDefinedTranslationList.length).length - 1;
            this.original = '';
            this.translated = '';
            // this.$timeout(() => {
            //   this.$scope.$apply();
            // });
            this.save({
                userDefinedTranslations: JSON.stringify(this.userDefinedTranslations)
            }, 'Added Translation');
        }
    }

    removeUserDefinedTranslation(original) {
        delete this.userDefinedTranslations[original];
        this.userDefinedTranslationList = this.toList(this.userDefinedTranslations);
        if (this.userDefinedTranslationList.length % 4 === 0) {
            this.userDefinedTranslationPage -= 1;
        }
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
        this.save({
            userDefinedTranslations: JSON.stringify(this.userDefinedTranslations)
        }, 'Removed Translation');
    }

    saveTranslation() {
        if (/^\s*$/.test(this.original) === false && /^\s*$/.test(this.translated) === false) {
            this.savedTranslations[this.original] = this.translated;
            this.savedTranslationList = this.toList(this.savedTranslations);
            this.savedTranslationPage = this.range(this.savedTranslationList.length).length - 1;
            this.original = '';
            this.translated = '';
            // this.$timeout(() => {
            //   this.$scope.$apply();
            // });
            this.save({
                savedTranslations: JSON.stringify(this.savedTranslations)
            }, 'Added Translation');
        }
    }

    removeSavedTranslation(original) {
        delete this.savedTranslations[original];
        this.savedTranslationList = this.toList(this.savedTranslations);
        if (this.savedTranslationList.length % 4 === 0) {
            this.savedTranslationPage -= 1;
        }
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
        this.save({
            savedTranslations: JSON.stringify(this.savedTranslations)
        }, 'Removed Translation');
    }

    /*****************************************************************************/

    /************************ LEARNT WORDS FUNCTIONS ****************************/

    addLearntWord() {
        if (/^\s*$/.test(this.newLearntWord) === false && this.learntWords.indexOf(this.newLearntWord) === -1) {
            this.learntWords.push(this.newLearntWord.trim());
            this.newLearntWord = '';
            this.learntWordPage = this.range(this.learntWords.length).length - 1;
            // this.$timeout(() => {
            //   this.$scope.$apply();
            // });
            this.save({
                learntWords: '(' + this.learntWords.join('|') + ')'
            }, 'New learnt word added');
        }
    }

    removeLearntWord(word) {
        this.learntWords.splice(this.learntWords.indexOf(word), 1);
        // TODO: check pagination!
        // check if the word is last on the page
        if (this.learntWords.length % 4 === 0) {
            this.learntWordPage -= 1;
        }
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
        this.save({
            learntWords: '(' + this.learntWords.join('|') + ')'
        }, 'Removed from learnt list');
    }

    /*****************************************************************************/

    /************************ WORD CONFIGURATION FUNCTIONS ****************************/

    setMinWordLength() {
        // add error checks
        this.save({
            minimumSourceWordLength: this.minWordLength
        }, 'Changed minimum Word Length');
    }

    setNgramMin() {
        // error checks
        this.save({
            ngramMin: this.ngramMin
        }, 'Changed minimum N-gram');
    }

    setNgramMax() {
        // error checks
        this.save({
            ngramMax: this.ngramMax
        }, 'Changed maximum N-gram');
    }

    /****************************************************************************/

    /************************ STATS FUNCTIONS ****************************/

    resetTotalWordCount() {
        this.stats.totalWordsTranslated = 0;
        this.save({
            stats: this.stats
        }, 'Total translated word count has been reset');
    }

    /****************************************************************************/

    /************************ ADJUSTMENT FUNCTIONS ****************************/

    intializeStyleOptions() {
        this.textColor = this.cssOptions[1].split(':')[1];
        console.log(this.textColor);
        this.backColor = this.cssOptions[2].split(':')[1];
    }

    setTextColor() {
        this.cssOptions[1] = 'color: ' + this.textColor;
        this.translatedWordStyle = this.cssOptions.join(';');
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
        // calling chrome.storage directly because we don't want success message
        this.utils.firebaseApp.ref(this.getUrl() + '/options/').update({
            translatedWordStyle: this.cssOptions.join(';')
        });
    }

    setBackgroundColor() {
        this.cssOptions[2] = 'background-color: ' + this.backColor;
        this.translatedWordStyle = this.cssOptions.join(';');
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
        // calling chrome.storage directly because we don't want success message
        this.utils.firebaseApp.ref(this.getUrl() + '/options/').update({
            translatedWordStyle: this.cssOptions.join(';')
        });
    }

    /**************************************************************************/

    /****************************** BACKUP FUNCTIONS ***********************/

    resetConfig() {
        var $this = this;
        console.log(this);
        $this.utils.firebaseApp.ref('default/').once('value').then(function(options) {
            $this.utils.firebaseApp.ref(this.getUrl() + '/options/').set(options.val()).then(function() {
                $this.getData();
                $this.setup();
                $this.toastCtrl.create({
                    message: 'Configuration Reset',
                    duration: 1000
                }).present();
            });
        });
        // chrome.storage.local.clear();
        // chrome.storage.local.set(localData);
    }

    deleteKeys() {
        this.yandexTranslatorApiKey = '';
        this.googleTranslatorApiKey = '';
        this.bingTranslatorApiKey = '';
        this.save({
            yandexTranslatorApiKey: '',
            googleTranslatorApiKey: '',
            bingTranslatorApiKey: ''
        }, 'Removed all API Keys');
        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });
    }

    // backupKeys() {
    //     this.utils.firebaseApp.ref(this.getUrl() + '/options/').once('value').then(function(snapshot) {
    //         var data = {
    //             googleTranslatorApiKey: snapshot.val().googleTranslatorApiKey,
    //             bingTranslatorApiKey: snapshot.val().bingTranslatorApiKey,
    //             yandexTranslatorApiKey: snapshot.val().yandexTranslatorApiKey
    //         };
    //         // saveFile(data, 'mtw_keys.txt');
    //     });
    // }

    backupAll() {

        var url = "https://mindtheword-16735.firebaseio.com/devices/" + localStorage.deviceID + "/options.json?print=pretty&format=export&download=mtw_config.txt";
        // var targetPath = cordova.file.documentsDirectory + "mtw_config.txt";
        // var trustHosts = true;
        // var options = {};

        // this.$cordovaFileTransfer.download(url, targetPath, options, trustHosts)
        //   .then(function(result) {
        window.open(url, "_system");
        //   this.fileTransfer.download(url, this.file.dataDirectory + 'mtw_config.txt',true).then((entry) => {
        //   console.log('download complete: ' + entry.toURL());
        //   this.toastCtrl.create({
        //         message: 'Backup Successful',
        //         duration: 1000
        //       }).present();
        // }, (error) => {
        //   console.log(error);
        //   // handle error
        // });
        //   });
        // this.utils.firebaseApp.ref(this.getUrl()+'/options/').once('value').then(function(snapshot){
        //   console.log(snapshot.val());
        //   saveFile(snapshot.val(), 'mtw_config.txt');
        // });
    }

    validateKeysFile(data) {
        if ('googleTranslatorApiKey' in data && 'bingTranslatorApiKey' in data && 'yandexTranslatorApiKey' in data) {
            return true;
        } else {
            return false;
        }
    }

    // restoreKeys() {
    //   let fileInput = document.getElementById('keys-file');

    //   fileInput.addEventListener('change', (e) => {
    //     let file = fileInput.files[0],
    //       textType = /textx.*/;

    //     if (file.type.match(textType)) {
    //       let reader = new FileReader();
    //       reader.onload = (e) => {
    //         var keys = JSON.parse(reader.result);
    //         if (this.validateKeysFile(keys)) {
    //           this.googleTranslatorApiKey = keys.googleTranslatorApiKey;
    //           this.bingTranslatorApiKey = keys.bingTranslatorApiKey;
    //           this.yandexTranslatorApiKey = keys.yandexTranslatorApiKey;
    //           this.save(keys, 'Restored keys from file');
    //           // this.$timeout(() => {
    //           //   this.$scope.$apply();
    //           // });
    //         } else {
    //           this.status('Corrupted File.', 2000, 100, 'danger');
    //         }
    //       };
    //       reader.readAsText(file);
    //     } else {
    //       this.status('Unsupported file format.', 2000, 100, 'danger');
    //     }
    //   });

    //   fileInput.click();
    // }

    validateConfigFile(data) {
        if (Object.keys(this.localData).length !== Object.keys(data).length) {
            return false;
        }
        for (let i in this.localData) {
            if (i in data) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }

    // restoreAll() {
    //   let fileInput = document.getElementById('config-file');

    //   fileInput.addEventListener('change', (e) => {
    //     let file = fileInput.files[0],
    //       textType = /text.*/;

    //     if (file.type.match(textType)) {
    //       let reader = new FileReader();
    //       reader.onload = (e) => {
    //         var config = JSON.parse(reader.result);
    //         if (this.validateConfigFile(config)) {
    //           this.save(config, 'Restored configuration from file');
    //           window.location.reload();
    //         } else {
    //           this.status('Corrupted File.', 2000, 100, 'danger');
    //         }
    //       };
    //       reader.readAsText(file);
    //     } else {
    //       this.status('Unsupported file format.', 2000, 100, 'danger');
    //     }
    //   });

    //   fileInput.click();
    // }

    /**************************************************************************/

    /****************************** QUIZ FUNCTIONS ***********************/

    // checkAnswer(index){
    //   var words = Object.keys(this.randomTranslatedWordsForQuiz);
    //   if(this.quizAnswers[index] === this.randomTranslatedWordsForQuiz[words[index]]){
    //     angular.element('#incorrect-result-' + index).hide();
    //     angular.element('#correct-result-' + index).show();
    //   }
    //   else{
    //     angular.element('#correct-result-' + index).hide();
    //     angular.element('#incorrect-result-' + index).show();
    //   }
    // }

    generateNewQuiz() {
        this.randomTranslatedWordsForQuiz = this.randomlySelectTenWords(this.translatedWordsForQuiz);
        this.translatedWordsExist = Object.keys(this.randomTranslatedWordsForQuiz).length === 0 ? false : true;
        this.quizOptions = this.getShuffledValues(this.randomTranslatedWordsForQuiz);
    }
    /**************************************************************************/

    handleNetworkError() {
        // need some work around of this
        // var $this = this;
        // chrome.runtime.onMessage.addListener(
        //   function(request, sender, sendResponse) {
        //     if($this.logMessages.indexOf(request)==-1){

        //       $this.logMessages.push(request);

        //       $this.$timeout(() => {
        //         $this.$scope.$apply();
        //       });

        //       $this.save({
        //           logMessages: JSON.stringify($this.logMessages)
        //       }, 'Added Log');
        //     }

        //     sendResponse({status:1});
        // });


    }

    removeLogMessage(index) {
        this.logMessages.splice(index, 1);

        // this.$timeout(() => {
        //   this.$scope.$apply();
        // });

        this.save({
            logMessages: JSON.stringify(this.logMessages)
        }, 'Removed Log');
    }

    /**
    * Utility function to configure the Firebase App incase user does not sign in
    */
    firebaseConfig() {
        var device;
        var $this = this;
        try {
            device = JSON.parse(localStorage.getItem('device'));
        } catch (e) {

            device = {
                "available": true,
                "platform": "browser",
                "version": "59.0.3071.86",
                "uuid": null,
                "cordova": "4.1.0",
                "model": "Chrome",
                "manufacturer": "unknown",
                "serial": "unknown"
            }
        }

        var deviceID = device.uuid;
        var default_options = {};
        var default_device_info = {};
        $this.utils.firebaseApp.ref('default/').once('value').then(function(options) {
            default_options = options.val();
        }).then(function() {
            default_device_info = {
                model: device.model,
                platform: device.platform,
                user: {
                    email: 'null',
                    gid: 'null'
                },
                options: default_options
            }
            console.log('deviceID', deviceID);
            if (deviceID == null) { // for browsers
                if (localStorage.deviceID == null) {
                    deviceID = $this.utils.firebaseApp.ref('devices/').push().key;
                    $this.utils.firebaseApp.ref('devices/' + deviceID).set(default_device_info);
                    localStorage.setItem('deviceID', deviceID);
                    localStorage.setItem('deviceInfo', JSON.stringify(default_device_info));
                    return;
                } else {
                    deviceID = localStorage.deviceID;
                }
            }
            var deviceRef = $this.utils.firebaseApp.ref('devices/' + deviceID);
            deviceRef.on('value', function(snapshot) {
                if (snapshot.exists()) {
                    localStorage.setItem('deviceInfo', JSON.stringify(snapshot));
                    localStorage.setItem('deviceID', deviceID);
                } else {
                    deviceRef.set(default_device_info);
                    localStorage.setItem('deviceInfo', JSON.stringify(default_device_info));
                }
            });
        });

    }

    /**
    * Utility function to return firbase url based on logged in status of user
    */
    getUrl() {
        if (localStorage.user) {
            return 'users/' + JSON.parse(localStorage.user).uid;
        } else {
            return 'devices/' + localStorage.deviceID;
        }
    }

    /**
    * Sign In to Firebase Auth after successful Google OAuth Sign In
    *
    * Creates a new user and initializes member variables with the default values otherwise if the user exists uses the values for that user
    * @param {Object} res Response Object recieved after Google Sign In - It contains the users basic data
    */
    firebaseAuth(res) {
        var $this = this;
        const firecreds = $this.utils.firebase.auth.GoogleAuthProvider.credential(res.idToken);
        return $this.utils.firebase.auth().signInWithCredential(firecreds).then((result) => {
            $this.user =  true;
            var user_info = {};
            user_info['displayName'] = result.displayName;
            user_info['email'] = result.email;
            user_info['emailVerified'] = result.emailVerified;
            user_info['photoURL'] = result.photoURL;
            user_info['isAnonymous'] = result.isAnonymous;
            user_info['uid'] = result.uid;
            // user['providerData'] = result.providerData;

            var firebaseRef = $this.utils.firebaseApp.ref('users/' + result.uid);
            return firebaseRef.once('value').then(function(snapshot) {
                if (snapshot.exists()) {
                    localStorage.setItem('user', JSON.stringify(snapshot.val()));
                    return true;
                } else {
                    return $this.utils.firebaseApp.ref('default/').once('value').then(function(options) {
                        user_info['options'] = options.val();
                        firebaseRef.set(user_info);
                        localStorage.setItem('user', JSON.stringify(user_info));
                    });
                }


            });
        }).catch((err) => {
            alert('Firebase auth failed' + err);
        });
    }


    /** 
    * Initializes login to Google OAuth and calls {@link firebasAuth}
    */
    login() {

        return this.googlePlus.login({
                'webClientId': '23095186114-dmf8g3affb9d324ggujuupomhjfq9qp8.apps.googleusercontent.com'
            })
            .then(res => {
                return this.firebaseAuth(res);
            })
            .catch(err => console.error(err));
    }

    /** 
    * Logs out the user
    */
    logout() {

        return this.googlePlus.logout()
            .then(() => {
                this.utils.firebase.auth().signOut().then(() => {
                    this.user = false;
                    localStorage.removeItem('user');
                }).catch(err => console.error(err));
            });
    }



}

// angular.module('mtwApp')
//   .controller('OptionCtrl', OptionCtrl)
//   .filter('startFrom', startFrom);