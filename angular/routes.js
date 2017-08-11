myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');//to get / inhome page
    $routeProvider
        .when('/', {
            templateUrl: 'views/main-view.html', //the first page showing all match details
            controller: 'mainController'       
        }) 
        .when('/filter', {                         //filtering happens at this page
            templateUrl: 'views/filterby-year.html',
            controller: 'mainController'
        })
        .when('/match2015/:team1/:team2', {          //particular match deatils of 2015/16 season and paasing team codes as routeparams
            templateUrl: 'views/match-details.html',
            controller: '2015Controller'
        })
        .when('/match2016/:team1/:team2', {             //particular match deatils of 2015/17 season and passing tgeam codes as routeparams
            templateUrl: 'views/match-details.html',
            controller: '2016Controller'
        })
        .when('/statistic15/:teamname', {             //view that shows aggregate statistical values of each team in 2015/16 season and passing of teamcode as routeParams
            templateUrl: 'views/statistics.html',
            controller: 'table15Controller'
        })
        .when('/statistic16/:teamname', {   //view that shows aggregate statistical values of each team in 2015/16 season and passing of teamcode as routeParams
            templateUrl: 'views/statistics.html',
            controller: 'table16Controller'
        })


        .otherwise({

            template: '<h1> 404 page not found</h1>'  //else errorpage
        })

}]);