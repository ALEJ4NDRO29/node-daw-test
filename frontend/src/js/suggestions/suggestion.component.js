
class SuggestionCompCtrl {
    constructor(Suggestions, Toastr) {
        'ngInject';

        // Form data
        this.suggestion = {
            name: '',
            email: '',
            content: ''
        };

        this.sendSug = function () {
            Suggestions.sendSuggestion(this.suggestion).then(function (response) {
                if(response) {
                    Toastr.success('Thanks you :)');
                } else {
                    Toastr.error('Error sending suggestion');
                }
            });

            // $http({
            //     method: 'POST',
            //     url: '/someUrl'
            // }).then(function successCallback(response) {
            //     Toastr.success('Thanks you :)');
            //     this.suggestion = {};
            // }, function errorCallback(response) {
            //     // called asynchronously if an error occurs
            //     // or server returns response with an error status.
            // });


        }
    }
}

let suggestionForm = {
    controller: SuggestionCompCtrl,
    templateUrl: 'suggestions/suggestionsForm.html'
};

export default suggestionForm;