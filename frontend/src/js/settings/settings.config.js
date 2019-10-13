function SettingsConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.settings', {
    url: '/settings',
    controller: 'SettingsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'settings/settings.html',
    title: 'Settings',
    resolve: {
      auth: function(Login) {
        return Login.ensureAuth(true);
      }
    }
  });
};

export default SettingsConfig;
