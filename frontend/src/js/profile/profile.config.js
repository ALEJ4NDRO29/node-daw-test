function ProfileConfig($stateProvider) {

    $stateProvider.state('app.profile', {
        url: '/user/:username',
        controller: 'ProfileCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'profile/profile.html',
        title: 'Profile',
        resolve: {
            user: function (Profile, $stateParams) {
                return Profile.getProfile($stateParams.username).then(
                    (profile) => profile,
                    (err) => $state.go('app.home')
                )
            }
        }
    })

}

export default ProfileConfig;