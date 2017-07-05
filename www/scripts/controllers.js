'use strict';

var baseUrl = 'http://139.59.23.184:8001';


angular.module('mtwApp')

    .controller('MainController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {

        $rootScope.title = "Mind The Word";

        // initialize

    }])

    .controller('LandingController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {


    }])

    .controller('NavController', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
        console.log($rootScope);
        setTimeout(function() {
            $('.button-collapse').sideNav({
                menuWidth: 300, // Default is 300
                edge: 'left', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: true
            });
        }, 1000);

    }])

    .controller('HeaderNavController', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

        $rootScope.title = 'Settings';
        $rootScope.redirect_url = 'app.settings';

        $rootScope.redirect = function() {
            $state.go($rootScope.redirect_url);
        };

        setTimeout(function() {
            $(".button-collapse").sideNav();
        }, 1000);

    }])

    .controller('HomeController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {

        $('select').material_select();
        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        $scope.url = '';

        $scope.openUrl = function() {
            // $cordovaInAppBrowser.open($scope.url, '_self', options)
            //  .then(function(event) {
            //    // success
            //  })
            //  .catch(function(event) {
            //    // error
            //  });

            if (!$scope.url.startsWith('http'))
                $scope.url = 'http://' + $scope.url;
            var ref = cordova.InAppBrowser.open($scope.url, '_blank', 'location=yes');
            ref.addEventListener('loadstop', loadStopCallBack);


            function loadStopCallBack() {
                ref.insertCSS({
                    code: "body{background:red;}"
                });
                $.ajax({
                    type: "GET",
                    url: "scripts/mtw.js",
                    dataType: "text",
                    success: function(msg) {
                        ref.executeScript({
                            code: msg
                        });
                    },
                    error: function() {
                        alert("Script Load Error");
                    }
                });

            }

            // $cordovaInAppBrowser.close();

        }

    }])

    .controller('SettingsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        // console.log($state,$location.$$path);
        $rootScope.redirect_url = 'app.home';
    }])
    .controller('TranslationSettingsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Translation';
        console.log($rootScope.opctrl.yandexTranslatorApiKey);
        var keys = {
            'Yandex': '<input placeholder="Key" id="key" value="' + $rootScope.opctrl.yandexTranslatorApiKey + '" type="text" autofocus>',
            'Bing': '<input placeholder="Client ID" id="client_id" value="' + $rootScope.opctrl.bingTranslatorApiKey.clientId + '" type="text" autofocus><input placeholder="Client Secret" id="client_secret" value="' + $rootScope.opctrl.bingTranslatorApiKey.clientSecret + '" type="text">',
            'Google': '<input placeholder="Key" id="key" value="' + $rootScope.opctrl.googleTranslatorApiKey + '" type="text" autofocus>'
        };

        var selectedKey = ''; // initialize
        var $selectedSwitch;

        $scope.toggleSwitch = function($event, key) {
            $selectedSwitch = $($event.currentTarget).closest('.switch');
            var checkedValue = $selectedSwitch.find('input[type="checkbox"]').prop('checked');
            if (!checkedValue) {
                $rootScope.modal_header = key;
                $('.modal-data').html('<div class="input-field col s6">' + keys[key] + '</div>');
                $('#modal1').modal('open');
            } else {
                // remove translator service
                $selectedSwitch.find('input[type="checkbox"]').prop('checked', false);
            }
        }

        $rootScope.submit = function() {
            selectedKey = $rootScope.modal_header;
            if (selectedKey == 'Yandex') {
                var key = $('input#key').val();
                $rootScope.opctrl.yandexTranslatorApiKey = key;
                $rootScope.opctrl.changeApiKey('Yandex');
                // send to DB
            } else if (selectedKey == 'Bing') {
                var client_id = $('input#client_id').val();
                var client_secret = $('input#client_secret').val();
                $rootScope.opctrl.bingTranslatorApiKey.clientId = client_id;
                $rootScope.opctrl.bingTranslatorApiKey.clientSecret = client_secret;
                $rootScope.opctrl.changeApiKey('Bing');
                // send to DB

            } else if (selectedKey == 'Google') {
                var key = $('input#key').val();
                $rootScope.opctrl.googleTranslatorApiKey = key;
                $rootScope.opctrl.changeApiKey('Google')
                // send to DB

            }
            $selectedSwitch.find('input[type="checkbox"]').prop('checked', true);
            $('.modal').modal('close');
        }
        // console.log($state,$location.$$path);
    }])
    .controller('BlacklistSettingsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Blacklist';

        var $selectedSwitch = '';
        $scope.toggleSwitch = function($event) {
            console.log($($event.currentTarget).closest('.switch'));
            $selectedSwitch = $($event.currentTarget).closest('.switch');
            var checkedValue = $selectedSwitch.find('input[type="checkbox"]').prop('checked');
            if (!checkedValue) {
                $rootScope.modal_header = 'Automatic Blacklisting';
                $('#modal2 .modal-data').html('<div class="input-field col s6">\
                    <div class="input-section">\
                    <p>Maximum Word Toggles</p>\
                    <input id="maximum_word_toggles_input" type="number" value="' + $rootScope.opctrl.wordToggles + '" autofocus>\
                    </div>\
                    <div class="input-section">\
                    <p>Maximum Activation Toggles</p>\
                    <input id="maximum_activation_toggles_input" type="number" value="' + $rootScope.opctrl.activationToggles + '" >\
                    </div>\
                    </div>');
                $('#modal2').modal('open');
            } else {
                // remove translator service
                $selectedSwitch.find('input[type="checkbox"]').prop('checked', false);
            }
        }

        $rootScope.confirm = function() {
            var maximum_word_toggles = $('input#maximum_word_toggles_input').val();
            var maximum_activation_toggles = $('input#maximum_activation_toggles_input').val();
            if ($rootScope.opctrl.wordToggles != maximum_word_toggles) {
                console.log($rootScope.opctrl.wordToggles, maximum_word_toggles);
                $rootScope.opctrl.wordToggles = maximum_word_toggles;
                $rootScope.opctrl.updateWordToggles();
            };
            if ($rootScope.opctrl.activationToggles != maximum_activation_toggles) {
                console.log($rootScope.opctrl.activationToggles, maximum_activation_toggles);
                $rootScope.opctrl.activationToggles = maximum_activation_toggles;
                $rootScope.opctrl.updateActivationToggles();
            };
            $selectedSwitch.find('input[type="checkbox"]').prop('checked', true);
            $('.modal').modal('close');
        }


        // console.log($state,$location.$$path);
    }])
    .controller('BlacklistWebsiteController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Blacklist Websites';
        $rootScope.redirect_url = 'app.blacklist';



        $scope.add = function() {
            $rootScope.modal_header = 'New Blacklist Website';
            $('.modal-data').html('<div class="input-field col s6">\
                <input placeholder="Website" id="new_blacklist_website" type="text" autofocus>\
              </div>');
            $('#modal1').modal('open');
            //  open modal box
        }

        $rootScope.submit = function() {
            var new_blacklist_website = $('#new_blacklist_website').val();
            $rootScope.opctrl.newBlacklistWebsite = new_blacklist_website;
            $rootScope.opctrl.addBlackListedWebsite();
        }
        // console.log($state,$location.$$path);
    }])
    .controller('BlacklistWordController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Blacklist Words';
        $rootScope.redirect_url = 'app.blacklist';

        $scope.add = function() {
            $rootScope.modal_header = 'New Blacklist Word';
            $('.modal-data').html('<div class="input-field col s6">\
                <input placeholder="Word" id="new_blacklist_word" type="text" autofocus>\
              </div>');
            $('#modal1').modal('open');
            //  open modal box
        }

        $rootScope.submit = function() {
            var new_blacklist_word = $('#new_blacklist_word').val();
            $rootScope.opctrl.newBlacklistWord = new_blacklist_word;
            $rootScope.opctrl.addBlackListedWord();
        }

        // console.log($state,$location.$$path);
    }])
    .controller('LearningSettingsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Learning';



        // console.log($state,$location.$$path);
    }])
    .controller('SavedTranslationsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Saved Translations';

        $rootScope.redirect_url = 'app.learning';

        $scope.add = function() {
            $rootScope.modal_header = 'New Saved Translation';
            $('.modal-data').html('<div class="input-field col s6">\
                <input placeholder="Original" id="new_saved_translation_original" type="text" autofocus>\
                 <input placeholder="Translated" id="new_saved_translation_translated" type="text" >\
              </div>');
            $('#modal1').modal('open');
            //  open modal box
        }

        $rootScope.submit = function() {
            var new_saved_translation_original = $('#new_saved_translation_original').val();
            var new_saved_translation_translated = $('#new_saved_translation_translated').val();
            $rootScope.opctrl.original = new_saved_translation_original;
            $rootScope.opctrl.translated = new_saved_translation_translated;
            $rootScope.opctrl.saveTranslation();

            $('.modal').modal('close');
        }
        // console.log($state,$location.$$path);
    }])
    .controller('DifficultyBucketsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Difficulty Buckets';

        $rootScope.redirect_url = 'app.learning';


        $scope.add = function() {
            $rootScope.modal_header = 'New Difficulty Bucket Word';
            $('.modal-data').html('<div class="input-field col s6">\
              <input placeholder="Word" id="new_difficulty_bucket_word" type="text" autofocus>\
              <select id="new_difficulty_bucket_level" class="browser-default">\
                <option value="Easy" selected>Easy</option>\
                <option value="Normal">Normal</option>\
                <option value="Hard">Hard</option>\
              </select>\
            </div>');
            $('select').material_select();
            $('.modal').addClass('no-overflow');
            $('#modal1').modal('open');
            //  open modal box
        }

        $rootScope.submit = function() {
            var new_difficulty_bucket_word = $('#new_difficulty_bucket_word').val();
            var new_difficulty_bucket_level = $('#new_difficulty_bucket_level').val();
            $rootScope.opctrl.newDifficultyBucketWord = new_difficulty_bucket_word;
            $rootScope.opctrl.newDifficultyBucketWordLevel = new_difficulty_bucket_level;
            $rootScope.opctrl.addWordToDifficultyBucket();
            $('.modal').modal('close');
        }
        // console.log($state,$location.$$path);
    }])
    .controller('LearntWordsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Learnt Words';

        $rootScope.redirect_url = 'app.learning';



        $scope.add = function() {
            $rootScope.modal_header = 'New Learnt Word';
            $('.modal-data').html('<div class="input-field col s6">\
                <input placeholder="Word" id="new_learnt_word" type="text" autofocus>\
              </div>');
            $('#modal1').modal('open');
            //  open modal box
        }

        $rootScope.submit = function() {
            var new_learnt_word = $('#new_learnt_word').val();
            $rootScope.opctrl.newLearntWord = new_learnt_word;
            $rootScope.opctrl.addLearntWord();

            $('.modal').modal('close');
        }
        // console.log($state,$location.$$path);
    }])
    .controller('AdvancedSettingsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Advanced';


        $scope.initJSColor = function() {
            var text_picker = new jscolor(document.getElementById('text_color_input'));
            var background_picker = new jscolor(document.getElementById('background_color_input'));

        }


        $scope.update = function(js) {
            console.log(js);
        }

        $scope.initJSColor();

        $scope.minWordLength = function() {
            $rootScope.modal_header = 'Minimum Word Length';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <input placeholder="Length" id="min_word_length_input" type="number" value="' + $rootScope.opctrl.minWordLength + '" autofocus>\
              </div>');
            $('#modal2').modal('open');
            $rootScope.confirm = function() {
                var min_word_length = $('#min_word_length_input').val();
                $rootScope.opctrl.minWordLength = min_word_length;
                $rootScope.opctrl.setMinWordLength();
                // $('#min_word_length').html(min_word_length);
                // send to DB
                $('.modal').modal('close');
            }
        }


        $scope.translatedSequences = function() {
            $rootScope.modal_header = 'Translated Sequences Must Have';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <div class="input-section">\
                <p>Minimum Words</p>\
                <input placeholder="Length" id="min_word_length_input" type="number" value="' + $rootScope.opctrl.ngramMin + '" autofocus>\
                </div>\
                <div class="input-section">\
                <p>Maximum Words</p>\
                <input placeholder="Length" id="max_word_length_input" type="number" value="' + $rootScope.opctrl.ngramMax + '" autofocus>\
                </div>\
              </div>');
            $('#modal2').modal('open');
            $rootScope.confirm = function() {
                var min_word_length = $('#min_word_length_input').val();
                var max_word_length = $('#max_word_length_input').val();
                if ($rootScope.opctrl.ngramMin != min_word_length) {
                    $rootScope.opctrl.ngramMin = min_word_length;
                    $rootScope.opctrl.setNgramMin()
                }
                if ($rootScope.opctrl.ngramMax != max_word_length) {
                    $rootScope.opctrl.ngramMax = max_word_length;
                    $rootScope.opctrl.setNgramMax()
                }
                // send to DB
                $('.modal').modal('close');
            }
        }




        // console.log($state,$location.$$path);
    }])

    .controller('UserDefinedTranslationsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'User Defined Translations';

        $rootScope.redirect_url = 'app.advanced';


        $scope.add = function() {
            $rootScope.modal_header = 'New User Defined Translation';
            $('.modal-data').html('<div class="input-field col s6">\
                <input placeholder="Original" id="new_user_defined_translation_original" type="text" autofocus>\
                 <input placeholder="Translated" id="new_user_defined_translation_translated" type="text" >\
              </div>');
            $('#modal1').modal('open');
            //  open modal box
        }

        $rootScope.submit = function() {
            var new_user_defined_translation_original = $('#new_user_defined_translation_original').val();
            var new_user_defined_translation_translated = $('#new_user_defined_translation_translated').val();

            $rootScope.opctrl.original = new_user_defined_translation_original;
            $rootScope.opctrl.translated = new_user_defined_translation_translated;
            $rootScope.opctrl.addUserDefinedTranslation();
            $('.modal').modal('close');
        }
        // console.log($state,$location.$$path);
    }])
    .controller('PlaybackSettingsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Playback Settings';

        var voices = [
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

        var voiceString = '<option value="" disabled selected>Select Voice Name</option>';
        voices.forEach(function(voice) {
            voiceString += '<option value="' + voice + '">' + voice + '</option>';
        });
        $scope.voiceName = function() {
            $rootScope.modal_header = 'Voice Name';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <select id="voice_name_input" class="browser-default">' + voiceString + '</select>\
              </div>');
            $('select').material_select();
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                var voice_name = $('#voice_name_input').val();
                $rootScope.opctrl.voiceName = voice_name;
                $rootScope.opctrl.updatePlaybackOptions();
                // send to DB
                $('.modal').modal('close');
            }
        }


        $scope.defaultVolume = function() {
            $rootScope.modal_header = 'Default Volume';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <p class="range-field">\
                  <input type="range" id="default_volume_input" min="0.2" max="1.0" value="' + $rootScope.opctrl.volume + '" step="0.1"/>\
                </p>\
              </div>');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                var default_volume = $('#default_volume_input').val();
                if ($rootScope.opctrl.volume != default_volume) {
                    $rootScope.opctrl.volume = default_volume;
                    $rootScope.opctrl.updatePlaybackOptions();
                }
                // send to DB
                $('.modal').modal('close');
            }
        }

        $scope.speechRate = function() {
            $rootScope.modal_header = 'Speech Rate';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <p class="range-field">\
                  <input type="range" id="speech_rate_input" min="0.5" max="4.0" value="' + $rootScope.opctrl.rate + '" step="0.1" />\
                </p>\
              </div>');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                var speech_rate = $('#speech_rate_input').val();
                if ($rootScope.opctrl.rate != speech_rate) {
                    $rootScope.opctrl.rate = speech_rate;
                    $rootScope.opctrl.updatePlaybackOptions()
                }
                // send to DB
                $('.modal').modal('close');
            }
        }

        $scope.pitch = function() {
            $rootScope.modal_header = 'Pitch';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <p class="range-field">\
                  <input type="range" id="pitch_input" min="0.0" max="2.0" value="' + $rootScope.opctrl.pitch + '" step="0.2" />\
                </p>\
              </div>');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                var pitch = $('#pitch_input').val();
                if ($rootScope.opctrl.pitch = pitch) {
                    $rootScope.opctrl.pitch = pitch;
                    $rootScope.opctrl.updatePlaybackOptions();
                }
                // send to DB
                $('.modal').modal('close');
            }
        }




    }])
    .controller('BackupSettingsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {

        $rootScope.title = 'Backup'

        // $scope.backupConfiguration = function() {
        //     $('.toast').remove();
        //     Materialize.toast('Configuration backup successfull',2000);
        // }

        // $scope.backupKeys = function() {
        //     $('.toast').remove();
        //     Materialize.toast('Keys backup successfull',2000);
        // }

        // $scope.restoreConfiguration = function() {
        //     $('.toast').remove();
        //     Materialize.toast('Configuration restore successfull',2000);
        // }

        // $scope.restoreAllSettings = function() {
        //     $('.toast').remove();
        //     Materialize.toast('Settings restore successfull',2000);
        // }


        $scope.resetConfiguration = function() {
            $rootScope.modal_header = 'Reset Configuration';
            $('.modal-data').html('<p>Are you sure you want to reset all the data. Please create a backup if you want to restore your data in the future.</p>');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                // console.log('Reset Configuration');
                $rootScope.opctrl.resetConfig();
                // DB
                $('.modal').modal('close');
            }
        }

        $scope.deleteKeys = function() {
            $rootScope.modal_header = 'Delete Keys';
            $('.modal-data').html('<p>Are you sure you want to remove all the keys. Please create a backup if you want to restore your keys in the future.This action is irreversible</p>');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                console.log('Delete Keys');
                // DB
                $rootScope.opctrl.deleteKeys();
                $('.modal').modal('close');
            }
        }



        // console.log($state,$location.$$path);
    }])
    .controller('ModalController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $(document).ready(function() {
            $('.modal').modal({
                ending_top: '45%',
                complete: function() {
                    $('.modal').removeClass('no-overflow');
                }
            });
        });

        $scope.cancel = function() {
            $('.modal').modal('close');
        }
        // $rootScope.title = 'Backup';
        // console.log($state,$location.$$path);
    }])