export default class Login {
    constructor(AppConstants, $http, JWT) {
        'ngInject';

        this.AppConstants = AppConstants;
        this.$http = $http;
    }

    register(registerData) {
        return this.$http({
            url: this.AppConstants.api + '/login/register',
            method: 'POST',
            data: registerData,
        }).then((res) => {
            return res;
        });
    }

    login(loginData) {
        return this.$http({
            url: this.AppConstants.api + '/login/',
            method: 'POST',
            data: {
                user: loginData
            }
        }).then((res) => {
            return res;
        }).catch((err) => {
            return err;
        })
    }

}