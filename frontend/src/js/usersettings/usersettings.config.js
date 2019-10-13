function UserSettingsConfig($stateProvider) {

    $stateProvider.state('app.usersettings',{
        url: '/mysettings',
        controller: 'UserSettingsCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'usersettings/usersettings.html',
        title: 'My Settigns',
        resolve: {
            auth: function(Login) {
              return Login.ensureAuth(true);
            }
          }
    })
}

export default UserSettingsConfig;