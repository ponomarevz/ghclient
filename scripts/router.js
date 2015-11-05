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
						user: function ( $route, SinglUserService, UserRepos)  {
								//------------------цепочка асинхронных вызовов возвращающи промис
								var userName = $route.current.params.userName;
								var re = {};
								return SinglUserService.getSinglUser(userName)
									.then(function(response) {
										re.usInfo = response.data; 
										return  UserRepos.getUserRepos(userName);
								}).then(function(response) {
										re.usRepo = response.data;
										return re;
								});
							}
						
						}
			})
			.when('/user/:userName/:repoName', {templateUrl: 'views/user.html', controller: 'appGitSingUsController',
					resolve: {
						user: function ( $route, SinglUserService, UserRepos)  {
								//------------------цепочка асинхронных вызовов возвращающи промис
								var userName = $route.current.params.userName;
								var re = {};
								return SinglUserService.getSinglUser(userName)
									.then(function(response) {
										re.usInfo = response.data; 
										return  UserRepos.getUserRepos(userName);
								}).then(function(response) {
										re.usRepo = response.data;
										return re;
								});
							}
						
						}
			})
			.when('/comits/:userName/:repoName', {templateUrl: 'views/commits.html', controller: 'appGitComitsUsController'})
			.when('/forks/:userName/:repoName', {templateUrl: 'views/forks.html', controller: 'appGitForksUsController'})
			.otherwise({redirectTo: '/usersList/0'});
		
	});