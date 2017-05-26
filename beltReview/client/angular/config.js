var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/users_new.html',
		controller: 'UsersController as UC'
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'UsersController as UC'
	})
	.when('/users/:id', {
		templateUrl: 'partials/users_show.html',
		controller: 'UsersController as UC'
	})
	.otherwise({ redirectTo: '/' });
})