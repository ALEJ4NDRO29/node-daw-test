export default class Suggestions {
    constructor(AppConstants, $http) {
        'ngInject';

        this.sendSuggestion = function (suggestion) {
            return $http({
                url: `${AppConstants.api}/suggestions/new`,
                method: 'POST',
                data: suggestion
            }).then(success)
            .catch(fail);
            function success() {
              return true;
            }
            function fail() {
              return false;
            }
        }
    }
}