export default class Element {
    constructor(AppConstants, $http) {
        'ngInject'

        this.AppConstants = AppConstants;
        this.$http = $http;
    }

    getAll() {
        return this.$http({
            url: this.AppConstants.api + '/elements/get',
            method: 'GET'
        }).then(function (response) {
            return response.data;
        });
    }

    findOne(slug) {
        return this.$http({
            url: `${this.AppConstants.api}/elements/get/${slug}`,
            method: 'GET'
        }).then(function (response) {
            return response;
        });
    }

    like(slug) {
        return this.$http({
            url: `${this.AppConstants.api}/elements/like/${slug}`,
            method: 'POST'
        }).then(function (response) {
            return response;
        });
    }

    unlike(slug) {
        return this.$http({
            url: `${this.AppConstants.api}/elements/like/${slug}`,
            method: 'DELETE'
        }).then(function (response) {
            return response;
        });
    }

    myLikes() {
        return this.$http({
            url: `${this.AppConstants.api}/elements/get/myLikes`,
            method: 'GET'
        }).then(function (response) {
            return response;
        });
    }
}