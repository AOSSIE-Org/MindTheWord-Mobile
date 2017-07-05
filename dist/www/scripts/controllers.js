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

            if(!$scope.url.startsWith('http'))
              $scope.url='http://'+$scope.url;
            var ref = cordova.InAppBrowser.open($scope.url, '_self', 'location=yes');
            ref.addEventListener('loadstop', loadStopCallBack);


            function loadStopCallBack(){
              ref.insertCSS({ code: "body{background:red;}" });
              $.ajax({
                  type: "GET",
                  url: "scripts/mtw.js",
                  dataType: "text",   
                  success: function (msg) {
                      ref.executeScript({code: msg});
                  },
                  error: function () {
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

        var keys = {
            'Yandex': '<input placeholder="Key" id="key" type="text" autofocus>',
            'Bing': '<input placeholder="Client ID" id="client_id" type="text" autofocus><input placeholder="Client Secret" id="client_secret" type="text">',
            'Google': '<input placeholder="Key" id="key" type="text" autofocus>'
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
                console.log(key);
                // send to DB
            } else if (selectedKey == 'Bing') {
                var client_id = $('input#client_id').val();
                var client_secret = $('input#client_secret').val();
                console.log(client_id, client_secret);
                // send to DB

            } else if (selectedKey == 'Google') {
                var key = $('input#key').val();
                console.log(key);
                // send to DB

            }
            console.log($selectedSwitch);
            $selectedSwitch.find('input[type="checkbox"]').prop('checked', true);
            $('#modal1').modal('close');
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
                    <input id="maximum_word_toggles_input" type="number" value="20" autofocus>\
                    </div>\
                    <div class="input-section">\
                    <p>Maximum Activation Toggles</p>\
                    <input id="maximum_activation_toggles_input" type="number" value="3" >\
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
            console.log(maximum_word_toggles,maximum_activation_toggles);
                // send to DB
            console.log($selectedSwitch);
            $selectedSwitch.find('input[type="checkbox"]').prop('checked', true);
            $('#modal2').modal('close');
        }

        
        // console.log($state,$location.$$path);
    }])
    .controller('BlacklistWebsiteController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Blacklist Websites';
        $rootScope.redirect_url = 'app.blacklist';

        $scope.blacklist_websites = [
            'stackoverflow.com',
            'github.com',
            'google.com',
            'code.google .com',
            'developer.*.com'
        ];

        $scope.delete = function($event) {
            var $element = $($event.target).closest('.collection-item');
            // send to DB
            $element.remove();
        }

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
            $scope.blacklist_websites.push(new_blacklist_website);
            $('#modal1').modal('close');
        }
        // console.log($state,$location.$$path);
    }])
    .controller('BlacklistWordController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Blacklist Words';
        $rootScope.redirect_url = 'app.blacklist';

        $scope.blacklist_words = [
            'this',
            'that',
            'the'
        ];

        $scope.delete = function($event) {
            var $element = $($event.target).closest('.collection-item');
            // send to DB
            $element.remove();
        }

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
            $scope.blacklist_words.push(new_blacklist_word);
            $('#modal1').modal('close');
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

        $scope.saved_translations = [{
                original: 'this',
                translated: 'this'
            },
            {
                original: 'that',
                translated: 'that'
            }
        ];

        $scope.delete = function($event) {
            var $element = $($event.target).closest('.collection-item');
            // send to DB
            $element.remove();
        }

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
            $scope.saved_translations.push({
                original: new_saved_translation_original,
                translated: new_saved_translation_translated
            });
            $('#modal1').modal('close');
        }
        // console.log($state,$location.$$path);
    }])
    .controller('DifficultyBucketsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Difficulty Buckets';

        $rootScope.redirect_url = 'app.learning';

        $scope.difficulty_bucket_words = [{
                word: 'this',
                level: 'this'
            },
            {
                word: 'that',
                level: 'that'
            }

        ];

        $scope.delete = function($event) {
            var $element = $($event.target).closest('.collection-item');
            // send to DB
            $element.remove();
        }

        $scope.add = function() {
            $rootScope.modal_header = 'New Difficulty Bucket Word';
            $('.modal-data').html('<div class="input-field col s6">\
              <input placeholder="Word" id="new_difficulty_bucket_word" type="text" autofocus>\
              <select id="new_difficulty_bucket_level">\
                <option value="" disabled selected>Level</option>\
                <option value="Easy">Easy</option>\
                <option value="Medium">Medium</option>\
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
            $scope.difficulty_bucket_words.push({
                word: new_difficulty_bucket_word,
                level: new_difficulty_bucket_level
            });

            $('#modal1').modal('close');
        }
        // console.log($state,$location.$$path);
    }])
    .controller('LearntWordsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Learnt Words';

        $rootScope.redirect_url = 'app.learning';

        $scope.learnt_words = [
            'this',
            'that'

        ];

        $scope.delete = function($event) {
            var $element = $($event.target).closest('.collection-item');
            // send to DB
            $element.remove();
        }

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
            $scope.learnt_words.push(new_learnt_word);

            $('#modal1').modal('close');
        }
        // console.log($state,$location.$$path);
    }])
    .controller('AdvancedSettingsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Advanced';

        $scope.minWordLength = function() {
            $rootScope.modal_header = 'Minimum Word Length';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <input placeholder="Length" id="min_word_length_input" type="number" value="' + $('#min_word_length').html() + '" autofocus>\
              </div>');
            $('#modal2').modal('open');
            $rootScope.confirm = function() {
                var min_word_length = $('#min_word_length_input').val();
                console.log(min_word_length);
                $('#min_word_length').html(min_word_length);
                // send to DB
                $('#modal2').modal('close');
            }
        }

        $scope.min_word_length = 1;
        $scope.max_word_length = 1;

        $scope.translatedSequences = function() {
            $rootScope.modal_header = 'Translated Sequences Must Have';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <div class="input-section">\
                <p>Minimum Words</p>\
                <input placeholder="Length" id="min_word_length_input" type="number" value="' + $scope.min_word_length + '" autofocus>\
                </div>\
                <div class="input-section">\
                <p>Maximum Words</p>\
                <input placeholder="Length" id="max_word_length_input" type="number" value="' + $scope.max_word_length + '" autofocus>\
                </div>\
              </div>');
            $('#modal2').modal('open');
            $rootScope.confirm = function() {
                var min_word_length = $('#min_word_length_input').val();
                var max_word_length = $('#max_word_length_input').val();
                console.log(min_word_length, max_word_length);
                // send to DB
                $('#modal2').modal('close');
            }
        }

        


        // console.log($state,$location.$$path);
    }])

    .controller('UserDefinedTranslationsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'User Defined Translations';

        $rootScope.redirect_url = 'app.advanced';

        $scope.user_defined_translations = [{
                original: 'this',
                translated: 'this'
            }

        ];

        $scope.delete = function($event) {
            var $element = $($event.target).closest('.collection-item');
            // send to DB
            $element.remove();
        }

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
            $scope.user_defined_translations.push({
                original: new_user_defined_translation_original,
                translated: new_user_defined_translation_translated
            });
            $('#modal1').modal('close');
        }
        // console.log($state,$location.$$path);
    }])
    .controller('PlaybackSettingsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {
        $rootScope.title = 'Playback Settings';


        $scope.voiceName = function() {
            $rootScope.modal_header = 'Voice Name';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <select id="voice_name_input">\
                  <option value="" disabled selected>Select Voice Name</option>\
                  <option value="Google US">Google US</option>\
                  <option value="Hindi">Hindi</option>\
                  <option value="Google UK">Google UK</option>\
                </select>\
              </div>');
            $('select').material_select();
            $('.modal').addClass('no-overflow');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                var voice_name = $('#voice_name_input').val();
                console.log(voice_name);
                $('#voice_name').html(voice_name);
                // send to DB
                $('#modal2').modal('close');
            }
        }


        $scope.defaultVolume = function() {
            $rootScope.modal_header = 'Default Volume';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <p class="range-field">\
                  <input type="range" id="default_volume_input" min="0" max="100" />\
                </p>\
              </div>');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                var default_volume = $('#default_volume_input').val();
                console.log(default_volume);
                // send to DB
                $('#modal2').modal('close');
            }
        }

        $scope.speechRate = function() {
            $rootScope.modal_header = 'Speech Rate';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <p class="range-field">\
                  <input type="range" id="speech_rate_input" min="0" max="100" />\
                </p>\
              </div>');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                var speech_rate = $('#speech_rate_input').val();
                console.log(speech_rate);
                // send to DB
                $('#modal2').modal('close');
            }
        }

        $scope.pitch = function() {
            $rootScope.modal_header = 'Pitch';
            $('#modal2 .modal-data').html('<div class="input-field col s6">\
                <p class="range-field">\
                  <input type="range" id="pitch_input" min="0" max="100" />\
                </p>\
              </div>');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                var pitch = $('#pitch_input').val();
                console.log(pitch);
                // send to DB
                $('#modal2').modal('close');
            }
        }


        

    }])
    .controller('BackupSettingsController', ['$rootScope', '$scope', '$state', '$location', function($rootScope, $scope, $state, $location) {

        $rootScope.title = 'Backup'

        $scope.backupConfiguration = function() {
            $('.toast').remove();
            Materialize.toast('Configuration backup successfull',2000);
        }

        $scope.backupKeys = function() {
            $('.toast').remove();
            Materialize.toast('Keys backup successfull',2000);
        }

        $scope.restoreConfiguration = function() {
            $('.toast').remove();
            Materialize.toast('Configuration restore successfull',2000);
        }

        $scope.restoreAllSettings = function() {
            $('.toast').remove();
            Materialize.toast('Settings restore successfull',2000);
        }


        $scope.resetConfiguration = function() {
            $rootScope.modal_header = 'Reset Configuration';
            $('.modal-data').html('<p>Are you sure you want to reset all the data. Please create a backup if you want to restore your data in the future.</p>');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                console.log('Reset Configuration');
                // DB
                $('#modal2').modal('close');
            }
        }

        $scope.deleteKeys = function() {
            $rootScope.modal_header = 'Delete Keys';
            $('.modal-data').html('<p>Are you sure you want to remove all the keys. Please create a backup if you want to restore your keys in the future.This action is irreversible</p>');
            $('#modal2').modal('open');

            $rootScope.confirm = function() {
                console.log('Delete Keys');
                // DB
                $('#modal2').modal('close');
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