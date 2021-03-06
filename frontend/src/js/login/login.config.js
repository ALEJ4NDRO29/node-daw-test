function LoginConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.login', {
            url: '/login',
            controller: 'LoginCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'login/login.html',
            title: 'Login',
            resolve: {
                auth: function (Login) {
                    Login.ensureAuth(false);
                }
            }
        })
        
        .state('app.sociallogin', {
            url: '/login/sociallogin',
            controller: 'LoginSocialCtrl',
            controllerAs: '$ctrl',
            title: 'Sign in...',
        });
}

export default LoginConfig;