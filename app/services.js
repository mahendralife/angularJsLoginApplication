'use strict';
//login services
app.factory('authenticate',['$http', '$cookies', '$rootScope', '$timeout','$window','$location','$templateCache','validPages','invalidPages',
	function($http, $cookies, $rootScope, $timeout,$window,$location,$templateCache,validPages,invalidPages){

		var services={}
		services.login=function(data,url,callback){

			 $timeout(function(){
			 	//using http request here
			 	$http({

					method:"POST",
					url:url,
					data:data,
					cache: $templateCache
				}).then(function(response){
					
					callback(response.data)

				})
				
            }, 1000);


		};

		//store data on cookies and session storage
		services.setAuthenticatedUser=function(user){
		//store cookies bases on user permission
			if(user.remember==true){
				
				$cookies.putObject('user', JSON.stringify(user));
			}
			else
			{
				var now = new Date();
				// this will set the expiration to 1day 
				var exp = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
				
				$cookies.putObject('user', JSON.stringify(user),{expires:exp});
				}


		};

		services.users=function(){
			

			if($cookies.getObject('user')){
				
				return $cookies.getObject('user');
			}
			else
			{
				return false;
			}


		};
		services.validateSession=function(){
			if(services.users())
			{
				return true
			}	
			else
			{
				return false
			}
		};

		//clear session data and cookies
		services.removeAuthenticatedUser=function()
		{
			$cookies.remove('user');
			

		}

		//set page authentication 
		services.pageAuth=function(current,redirect){
			
			var boolean=true;
			
			var page=validPages.indexOf(current);
			if(page==-1)
			{
				
				boolean=false;
			}

			if(page>=0 && !services.validateSession()){
				//redirect to login page
				$location.path(redirect);

			}
			
			return boolean;
			

		};

		//if session is exist then redirect to home page
		services.pageAuthInvalid=function(current,redirect){
			
			var boolean=true;
			var page=invalidPages.indexOf(current);
			

			if(page>=0 && services.validateSession()){
				//redirect to homepage page
				$location.path(redirect);

			}
			
			return boolean;
			

		};


		return services;


}]);