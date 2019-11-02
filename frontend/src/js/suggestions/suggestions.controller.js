class SuggestionsCtrl {
    constructor($scope) {
        'ngInject';
        this.$scope = $scope;
        this.formVisible = true;
    }

    showList() {
        this.formVisible = false;
        this.$scope.$broadcast('setListSug');
    }

}

export default SuggestionsCtrl;