import angular from 'angular';

let suggestionsModule = angular.module('app.suggestions', [])

// Include our UI-Router config settings
import SuggestionsConfig from './suggestions.config';
suggestionsModule.config(SuggestionsConfig);


// Controllers
import SuggestionsCtrl from './suggestions.controller';
suggestionsModule.controller('SuggestionsCtrl', SuggestionsCtrl);

// Component
import suggestionForm from './suggestion.component';
suggestionsModule.component('suggestionForm', suggestionForm);

export default suggestionsModule;