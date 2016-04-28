"use strict";

(function(){
    angular
        .module("NewsApp")
        .controller("UsersFollowingController", UsersFollowingController);

function UsersFollowingController(UserService, $location) {
    var vm = this;

    function init() {
        vm.$location = $location;
        UserService
            .getCurrentUser()
            .then(function (response) {
                vm.currentUser = response.data;
                return UserService.findUsersByUsernames(vm.currentUser.followers)
            })
            .then(function (response) {
                vm.totalFollowers = response.data;
                vm.followers = vm.totalFollowers.slice(0, 12);
                vm.followersCount = 12;
            });
    }
    init();

}
})();