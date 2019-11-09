export default class Events {
    constructor(AppConstants, $http) {
        this.AppConstants = AppConstants;
        this.$http = $http;
    }

    getAll() {
        return this.$http({
            url: this.AppConstants.apiMoleculer + '/events',
            method: 'GET'
        }).then(function (response) {
            return response.data;
        });
    }
}

