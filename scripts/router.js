'use strict';
//-------------роутер--------------
	angular.module('appGit').config(function($routeProvider) {
	
		$routeProvider
			.when('/usersList/:page', {templateUrl: 'views/userstable.html', controller: 'appGitUsersController', 
					resolve: {
						users: function ( $route, UserService, SinglUserService, $q)  {
								var page = parseInt($route.current.params.page);			
								var re = {};
								return UserService.getUsers(page)
								.then(function(response) {
									re = response.data;
									var promisAr = [];
									//----------может както развернуть это в промис????
									for(var it in re) {
										(function(it){
											var promis = SinglUserService.getSinglUser(re[it].login)
											.then(function(response){
												re[it].email = response.data.email || "нет мыла";
											}, function(error){
												re[it].email = "что то пошло не так";
											});
											promisAr.push(promis);
										})(it);					
									}
									return $q.all(promisAr);
								})
								.then(function(response){
									return re;
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
			.when('/comits/:userName/:repoName', {templateUrl: 'views/commits.html', controller: 'appGitComitsUsController',
					resolve: {
						commits: function($route, UserCommits) {
							var user = $route.current.params.userName;
							var repo = $route.current.params.repoName;
							
							return UserCommits.getUserCommits(user, repo).then(function(response) {
								return response.data;
							});
						}
					}
			})
			.when('/forks/:userName/:repoName', {templateUrl: 'views/forks.html', controller: 'appGitForksUsController',
					resolve: {
						forks: function($route, UserForks) {
							var user = $route.current.params.userName;
							var repo = $route.current.params.repoName;
							return UserForks.getUserForks(user, repo).then(function(response) {
								return response.data;
							});
							
							
						}
					}
			})
			.when('/about', {templateUrl: 'views/about.html'})
			.when('/search/:name', {templateUrl: 'views/userstable.html', controller: 'appGitUsersController', 
					resolve: {
						users: function ( $route, UserSearch)  {
								var res = $route.current.params.name;			
								return UserSearch.getUser(res).then(function(response) {
									return response.data.items;
									});
								}
						}
			})
			.otherwise({redirectTo: '/usersList/0'});
		
	});