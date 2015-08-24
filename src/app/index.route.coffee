angular.module "simgame"
  .config ($stateProvider, $urlRouterProvider, $locationProvider) ->
    $stateProvider
      .state "home",
        url: "/"
        templateUrl: "app/main/main.html"
        controller: "MainController"
        controllerAs: "main"

    $locationProvider.html5Mode true

    $urlRouterProvider.otherwise '/'
