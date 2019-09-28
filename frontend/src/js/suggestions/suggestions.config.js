function SuggestionsCtrl($stateProvider) {
    'ngInject';

    $stateProvider.state('app.suggestions',{
            url: '/suggestions',
            controller: 'SuggestionsCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'suggestions/suggestions.html',
            title: 'Suggestions'
        }
    )
}

export default SuggestionsCtrl;