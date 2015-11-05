(function(){
'use strict';

	angular
		.module('appGit')
			.service('UserService', UserService);
	  
	function UserService ($http) {
		//------------ИЗВЛЕЯЕНИЕ ДАННЫХ
		this.getUsers = function (page) {
			var res = "https://api.github.com/users?since=" + page + "&per_page=10";
		
			return $http.get(res).then(function(response){
			//------------пост обработка респонса
				return response;
			});
		};
	};
	
	angular
		.module('appGit')
			.service('SinglUserService', SinglUserService);
	
	function SinglUserService($http) {
		//------------ИЗВЛЕЯЕНИЕ ДАННЫХ
		this.getSinglUser = function (name) {
			
			var res = 'https://api.github.com/users/' + name;
			return $http.get(res).then(function(response) {
				return response;
			});
		};
	};
	
	angular
		.module('appGit')
			.service('UserRepos', UserRepos);
	
	function UserRepos($http) {
		//------------ИЗВЛЕЯЕНИЕ ДАННЫХ
		this.getUserRepos = function (name) {
			var res = 'https://api.github.com/users/' + name + '/repos';
			return $http.get(res).then(function(response) {
				return response;
			});
		};
	};
	

})();


//$http.get($scope.userInform.repos_url).success(function(data){
//				$scope.repoData = data;
//			});

  
  /*------------------------------
  function UserService ($http) {
	return {
  sayHello: function (name) {
    return 'Привет тебе ' + name;
  },
  getUsers: function () {
	 var res = "https://api.github.com/users?since=" + 10 + "&per_page=10";
	 return $http.get(res);
  }
	}
} 

angular
  .module('appGit')
  .factory('UserService', UserService);
		
	--------------------------------------*/	