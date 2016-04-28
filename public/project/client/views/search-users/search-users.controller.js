(function(){
    angular
        .module("NewsApp")
        .controller("SearchUsersController", SearchUsersController);

    function SearchUsersController(UserService, $scope, $rootScope, $location) {
    //
    //    var vm = this;
    //
    //    vm.search = search;
    //
    //    function init(){
    //        vm.$location = $location;
    //    };
    //    init();
    //
    //    function search(user){
    //        if(user == null){
    //            alert("Enter a Username");
    //            return;
    //        }
    //        //console.log(user);
    //        UserService
    //            .searchUserByUsername(user)
    //            .then(
    //                function (response) {
    //                    if(response){
    //                        console.log(response.data);
    //                        //$scope.data = response.data;
    //                        $scope.results = response.data;
    //                    }
    //                }
    //            )
    //    }

        var vm = this;
        vm.follow = follow;
        vm.search = search;

        function init() {
            vm.query1 = "";
            //vm.query2 = "";
            vm.$location = $location;
        }
        init();

        function search(firstName) {
            if (firstName.length == 0) {
                alert("Enter a Name");
                return;
            }
            UserService
                .search(firstName)
                .then(function(response) {
                    console.log(response);
                    vm.results = response.data;
                });
        }

        function follow(currentUser,user) {
            UserService
                .handleFollow(currentUser.username, user, 1)
                .then(function(response) {
                    var user = response.data[1];
                    UserService.setCurrentUser(response.data[0]);
                });
        }

    }
})();