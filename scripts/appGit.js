
	'use strict';
angular
	.module('appGit', [
		'ngRoute'
	])
	.controller('appGitUsersController', function ($scope, $http, $routeParams, users) {
				
		$scope.users = users;
		
					
		$scope.nextPage = function() {
			return  parseInt($routeParams.page) + 10;
		};
	
		$scope.prevPage = function() {
			return  parseInt($routeParams.page) - 10;
		};
		
	$scope.getSinglUs = function(item) {
		var res = 'https://api.github.com/users/' + item.login;
		$http.get(res).success(function (data) {
			item.email = data.email;
			$scope.userInform = data;
		});
	};
	
	$scope.selTable = function(item) {
		$scope.getSinglUs(item);
	};
		
	$scope.search = function() {
				
		var res = 'https://api.github.com/search/users?q=' +  $scope.sear_param + '+repos:>=0+followers:>=0';
				
		$http.get(res).success(function (data) {
			
				for(var it in data.items) {
					$scope.getSinglUs(data.items[it]);
				}
				$scope.users = data.items;
		});
	};
		
	

	})
	.controller('appGitSingUsController', function ($scope, $http, $routeParams, user) {
	
		
		$scope.userName = $routeParams.userName;
		$scope.repoName = $routeParams.repoName;
		
		$scope.userInform = user.usInfo;
		$scope.repoData = user.usRepo;
		
		
				
		$scope.selItem = function(repo) {
			location.hash = '#/user/' + $scope.userName + '/' + repo.name;
		};
		
		$scope.isSelItem = function(repo) {
			return  $scope.repoName === repo.name;
		};
		
		$scope.getClassRow = function(repo) {
			var res = 'row how';
			if ($scope.isSelItem(repo)) { 
				res = 'row list-group-item-warning how';
			} 
			return res;
		};
	}).controller('appGitComitsUsController', function ($scope, $http, $routeParams) {
		
	
		
		$scope.userName = $routeParams.userName;
		$scope.repoName = $routeParams.repoName;
		var res = 'https://api.github.com/repos/' + $scope.userName + '/' + $scope.repoName + '/commits';
		$http.get(res).success(function (data) {
			$scope.commitsData = data;
		});
	})
	.controller('appGitForksUsController', function ($scope, $http, $routeParams) {
		
		
		$scope.userName = $routeParams.userName;
		$scope.repoName = $routeParams.repoName;
		var res = 'https://api.github.com/repos/' + $scope.userName + '/' + $scope.repoName + '/forks';
		$http.get(res).success(function (data) {
			$scope.forksData = data;
		});
	});
	
