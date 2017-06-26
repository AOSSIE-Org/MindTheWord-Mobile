'use strict';

angular.module('mtwApp')
    .service('demoService', function() {
     	// write demo service here
    });


	// .directive('siteHeader', function () {
	//     return {
	//         restrict: 'E',
	//         template: '<a class="back-btn" style="display: block;"><i class="material-icons">arrow_back</i></a>',
	//         scope: {
	//             back: '@back',
	//             forward: '@forward',
	//             icons: '@icons'
	//         },
	//         link: function(scope, element, attrs) {
	//             $(element[0]).on('click', function() {
	//                 history.back();
	//                 scope.$apply();
	//             });
	//         }
	//     };
	// });
