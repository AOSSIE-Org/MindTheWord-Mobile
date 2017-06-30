'use strict';

angular.module('mtwApp', ['ui.router', 'ngCordova'])
    .config(function($stateProvider, $urlRouterProvider, $cordovaInAppBrowserProvider) {
        $stateProvider

            .state('app', {
                url: '/',
                views: {

                    'content': {
                        templateUrl: 'views/landing.html'
                    },
                    'modal': {
                        templateUrl: 'views/modal.html'
                    }
                }

            })
            .state('app.home', {
                url: 'home',
                views: {
                    'header@': {
                        templateUrl: 'views/nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/content.html'
                    }
                }

            })
            .state('app.settings', {
                url: 'settings/',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings.html'
                    },

                }

            })
            .state('app.translation', {
                url: 'settings/translation',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/translation.html'
                    },

                }

            })

            .state('app.blacklist', {
                url: 'settings/blacklist',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/blacklist.html'
                    },

                }

            })

            .state('app.learning', {
                url: 'settings/learning',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/learning.html'
                    },

                }

            })
            .state('app.saved-translations', {
                url: 'settings/learning/saved-translations',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/learning/saved-translations.html'
                    },

                }

            })
            .state('app.difficulty-buckets', {
                url: 'settings/learning/difficulty-buckets',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/learning/difficulty-buckets.html'
                    },

                }

            })
            .state('app.learnt-words', {
                url: 'settings/learning/learnt-words',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/learning/learnt-words.html'
                    },

                }

            })
            .state('app.advanced', {
                url: 'settings/advanced',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/advanced.html'
                    },
                    'modal': {
                        templateUrl: 'views/modal.html'
                    }
                }

            })
            .state('app.user-defined-translations', {
                url: 'settings/advanced/user-defined-translations',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/advanced/user-defined-translations.html'
                    },
                    'modal': {
                        templateUrl: 'views/modal.html'
                    }
                }

            })
            .state('app.playback-settings', {
                url: 'settings/advanced/playback-settings',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/advanced/playback-settings.html'
                    },
                    'modal': {
                        templateUrl: 'views/modal.html'
                    }
                }

            })
            .state('app.backup', {
                url: 'settings/backup',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/backup.html'
                    },
                    'modal': {
                        templateUrl: 'views/modal.html'
                    }
                }

            })


            .state('app.blacklist-websites', {
                url: 'settings/blacklist/websites/',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/blacklist/blacklist-websites.html'
                    },

                }

            })

            .state('app.blacklist-words', {
                url: 'settings/blacklist/words/',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/blacklist/blacklist-words.html'
                    },

                }

            })
            .state('app.auto-blacklist', {
                url: 'settings/blacklist/automatic/',
                views: {
                    'header@': {
                        templateUrl: 'views/header-nav.html'
                    },
                    'content@': {
                        templateUrl: 'views/settings/blacklist/auto-blacklisting.html'
                    },

                }

            })


        // route to redirect to home in case URL not defined
        $urlRouterProvider.otherwise('/');

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            window.open = cordova.InAppBrowser.open;
            // alert('Device Model: '    + device.model    + '\n' + 'Device Cordova: '  + device.cordova  + '\n' + 'Device Platform: ' + device.platform + '\n' + 'Device UUID: '     + device.uuid     + '\n' + 'Device Version: '  + device.version  + '\n');
            localStorage.setItem('device',JSON.stringify(device));
            // firebaseInit();
            // firebaseConfig();
        }


       

    })


    .run(function($rootScope, $state, $location) {

        // to execute commands while angular app in running
    });