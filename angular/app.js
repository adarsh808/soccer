var myApp = angular.module("myApp", ['ngRoute'])//declaring myApp module with ngRoute injected


myApp.service('dataService', ['$http', function($http) {//a custom servive for storing json data into scope vaeiables with http service
    var alias = this;
    $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json').then(function successCallback(response) {
        console.log(response)
        alias.game2015 = response.data;

    }, function errorCallback(data1) {
        console.log(data1);
    });//end of http
    $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json').then(function success(response1) {

        alias.game2016 = response1.data;

    }, function error(data2) {
        console.log(data2);
    });//end of http
}]);//end of service



myApp.controller('mainController', ['$scope', 'dataService', function($scope, dataService) {//defining maincontroller that has dataservice injected 

//storing the json into varibles
    $scope.game15 = dataService.game2015;

    $scope.game16 = dataService.game2016;



}]);//end of maincontreoller
//controller that is called when view about match deatilsin 2015/16 seoson is routed 
myApp.controller('2015Controller', ['$scope', 'dataService', '$routeParams',  function($scope, dataService, $routeParams) {
    

    $scope.game5 = dataService.game2015;//using dataService to get json
    $scope.code1 = $routeParams.team1;//passing the code of the teams to the controller 
    $scope.code2 = $routeParams.team2;
    for (i in $scope.game5['rounds']) {                   //iterating through the particular json
        for (j in $scope.game5.rounds[i].matches) {
            $scope.alias = $scope.game5.rounds[i].matches[j];
            if ($scope.alias.team1.code == $scope.code1 && $scope.alias.team2.code == $scope.code2) { //checking the code of the teams with the passed codes
                $scope.date = $scope.alias.date;
                $scope.team1 = $scope.alias.team1.name;//if found storing theother deatils to scope varibales
                $scope.team2 = $scope.alias.team2.name;
                $scope.score1 = $scope.alias.score1;
                $scope.score2 = $scope.alias.score2;
            }
        }

    }




}]);//end of 2015controller

//controller that is called when view about match deatilsin 2016/17 seoson is routed 
myApp.controller('2016Controller', ['$scope', 'dataService', '$routeParams',  function($scope, dataService, $routeParams) {
    

    $scope.game6 = dataService.game2016;//using dataservice to get json 
    $scope.code1 = $routeParams.team1;//passing the code of the teams to the controller
    $scope.code2 = $routeParams.team2;
    for (i in $scope.game6['rounds']) {
        for (j in $scope.game6.rounds[i].matches) {                 //iterating through the particular json
        for (j in $scope.game6.rounds[i].matches) {
            $scope.alias = $scope.game6.rounds[i].matches[j];
            if ($scope.alias.team1.code == $scope.code1 && $scope.alias.team2.code == $scope.code2) {  //checking the code of the teams with the passed codes
                console.log($scope.alias.date);
                console.log($scope.alias.team1.name);
                console.log($scope.alias.team2.name);
                console.log($scope.alias.score1);
                console.log($scope.alias.score2);
                $scope.date = $scope.alias.date;
                $scope.team1 = $scope.alias.team1.name; //if found storing theother deatils to scope varibales
                $scope.team2 = $scope.alias.team2.name;
                $scope.score1 = $scope.alias.score1;
                $scope.score2 = $scope.alias.score2;
            }
        }

       }
    }


}]);//end of 2016controller


//controller to calculate the statistics of particular teams in 2015/16 seoson when the code name of the team is passed via routeParam
myApp.controller('table15Controller', ['$scope', 'dataService', '$routeParams', function($scope, dataService, $routeParams) {
    

    $scope.game5 = dataService.game2015;//using dataservice to get json 

    $scope.team = $routeParams.teamname;//getting passed team code
    $scope.win = 0;             //initializing all the aggreagtes to 0
    $scope.loss = 0;
    $scope.draw = 0;
    $scope.play = 0;
    $scope.goals = 0;
    $scope.points = 0;
    $scope.teamname1='';
    for (i in $scope.game5.rounds) {            //iterating through the json
        for (j in $scope.game5.rounds[i].matches) {
            $scope.alias = $scope.game5.rounds[i].matches[j];
            if ($scope.alias.team1.code == $scope.team) {        //passed code is checked against all other codes of team1
                $scope.teamname1 = $scope.alias.team1.name;
                $scope.goals = $scope.goals + $scope.alias.score1; //calculating goals
                $scope.play = $scope.play + 1;                      //calculating number of matches played
                if ($scope.alias.score1 > $scope.alias.score2) {    //checking between score(if high score)
                    $scope.win = $scope.win + 1;                     //calculating num of wins
                    $scope.points = $scope.points + 2;                //calculating points if win
                } else if ($scope.alias.score1 < $scope.alias.score2) //if score is less(loss)
                    $scope.loss = $scope.loss + 1;                     //calculating loses
                else {
                    $scope.draw = $scope.draw + 1;                     //calculating draws
                    $scope.points = $scope.points + 1;                 //points if draw 
                }

                   


            } 
                else if ($scope.alias.team2.code == $scope.team) {           //passed code is checked against all other codes of team2
                $scope.teamname1 = $scope.alias.team2.name;
                $scope.goals = $scope.goals + $scope.alias.score2;       //calculating goals
                $scope.play = $scope.play + 1;                           //calculating number of matches played
                if ($scope.alias.score1 < $scope.alias.score2) {         //checking between score(if high score)
                    $scope.win = $scope.win + 1;                          //calculating num of wins
                    $scope.points = $scope.points + 2;                       //calculating points if win
                } else if ($scope.alias.score1 > $scope.alias.score2)        //if score is less(loss)
                    $scope.loss = $scope.loss + 1;                           //calculating loses
                else {
                    $scope.draw = $scope.draw + 1;                             //calculating draws
                    $scope.points = $scope.points + 1;                       //points if draw
                }
            }

        }
    }
    console.log($scope.teamname1);
    console.log($scope.play);
    console.log($scope.win);
    console.log($scope.loss);
    console.log($scope.draw);
    console.log($scope.goals);
}]);//end of table2015controller
//controller to calculate the statistics of particular teams in 2015/16 seoson when the code name of the team is passed via routeParam
myApp.controller('table16Controller', ['$scope', 'dataService', '$routeParams', function($scope, dataService, $routeParams) {

    
// using samelogic as the  table15controller
    $scope.game6 = dataService.game2016;
    $scope.team = $routeParams.teamname;

    $scope.win = 0;
    $scope.loss = 0;
    $scope.draw = 0;
    $scope.play = 0;
    $scope.goals = 0;
    $scope.points=0;
    $scope.teamname1='';
    for (i in $scope.game6.rounds) {
        for (j in $scope.game6.rounds[i].matches) {
            $scope.alias = $scope.game6.rounds[i].matches[j]
            if ($scope.alias.team1.code == $scope.team) {
                $scope.teamname1 = $scope.alias.team1.name;
                $scope.goals = $scope.goals + $scope.alias.score1;
                $scope.play = $scope.play + 1;
                if ($scope.alias.score1 > $scope.alias.score2) {
                    $scope.win = $scope.win + 1;
                    $scope.points = $scope.points + 2;
                } else if ($scope.alias.score1 < $scope.alias.score2)
                    $scope.loss = $scope.loss + 1;
                else {
                    $scope.draw = $scope.draw + 1;
                    $scope.points = $scope.points + 1;

                }




            } else if ($scope.alias.team2.code == $scope.team) {
                $scope.teamname1 = $scope.alias.team2.name;
                $scope.goals = $scope.goals + $scope.alias.score2;
                $scope.play = $scope.play + 1;
                if ($scope.alias.score1 < $scope.alias.score2) {
                    $scope.win = $scope.win + 1;
                    $scope.points = $scope.points + 2;
                } else if ($scope.alias.score1 > $scope.alias.score2)
                    $scope.loss = $scope.loss + 1;
                else {
                    $scope.draw = $scope.draw + 1;
                    $scope.points = $scope.points + 1;
                }
            }

        }
    }
     console.log($scope.teamname1);
    console.log($scope.play);
    console.log($scope.win);
    console.log($scope.loss);
    console.log($scope.draw);
    console.log($scope.goals);
}]);//end of table16controller