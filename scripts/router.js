'use strict';
//-------------роутер--------------
	angular.module('appGit').config(function($routeProvider) {
	
		$routeProvider
			.when('/usersList/:page', {templateUrl: 'views/userstable.html', controller: 'appGitUsersController', 
					resolve: {
						users: function ( $route, UserService)  {
								var page = parseInt($route.current.params.page);			
								return UserService.getUsers(page).then(function(response) {
									return response.data;
									});
								}
						}
					})
			.when('/user/:userName', {templateUrl: 'views/user.html', controller: 'appGitSingUsController',
					resolve: {
						user: function ( $route, SinglUserService)  {
								var userName = $route.current.params.userName;
								
								return SinglUserService.getSinglUser(userName).then(function(response) {
									return  response.data;									
								});
							},
						repo: function ( $route, UserRepos)  {
							var userName = $route.current.params.userName;
							return UserRepos.getUserRepos(userName).then(function(response){
									return response.data;
								});
							}
						}
			})
			.when('/user/:userName/:repoName', {templateUrl: 'views/user.html', controller: 'appGitSingUsController',
					resolve: {
						user: function ( $route, SinglUserService)  {
								var userName = $route.current.params.userName;
								
								return SinglUserService.getSinglUser(userName).then(function(response) {
									return  response.data;									
								});
							},
						repo: function ( $route, UserRepos)  {
							var userName = $route.current.params.userName;
							return UserRepos.getUserRepos(userName).then(function(response){
									return response.data;
								});
							}
						}
			})
			.when('/comits/:userName/:repoName', {templateUrl: 'views/commits.html', controller: 'appGitComitsUsController'})
			.when('/forks/:userName/:repoName', {templateUrl: 'views/forks.html', controller: 'appGitForksUsController'})
			.otherwise({redirectTo: '/usersList/0'});
		
	});