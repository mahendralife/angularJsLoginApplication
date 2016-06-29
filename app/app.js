'use strict';
//define madule

var app=angular.module('login-app',['ngRoute','ngCookies','ngAnimate']);
//define pages for access after login
var pages=new Array();
var withoutLoginAccessPage=new Array();
withoutLoginAccessPage=['/login']
pages=['/services',"/"];

app.constant("validPages",pages);
app.constant("invalidPages",withoutLoginAccessPage);

//configure app route
app.config(['$routeProvider', function($routeProvider){

	$routeProvider.when('/login',
	{
		controller:"loginController",
		templateUrl:"views/login/index.html"
	})
	.when('/',{
		controller:"homeController",
		templateUrl:"views/home/index.html"
	}).when('/contacts',{
        controller:"contacts",
        templateUrl:"views/contacts/contacts.html"
    }).when('/services',{
        controller:"services",
        templateUrl:"views/services/services.html"
    })
    .when('/docs',{
        controller:"docs",
        templateUrl:"views/docs/docs.html"
    })
	.otherwise({redirectTo:"/"})
}]);


//start the app 
app.run(function ($rootScope, $location, $http,authenticate) {
        // keep user logged in after page refresh
      $rootScope.logout=function(url){
        
        authenticate.removeAuthenticatedUser();
        $location.path(url);
    }

        
   
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
        $rootScope.session=authenticate.validateSession();
        authenticate.pageAuth($location.path(),"/login")
        authenticate.pageAuthInvalid($location.path(),"/");
            
        	
        });
    });