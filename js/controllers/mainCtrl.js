app.controller("mainCtrl",function($scope,$navigate){
    /*必须*/
    $scope.historyBack=$navigate.back;
})