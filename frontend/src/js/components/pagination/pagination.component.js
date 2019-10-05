class PaginationCtrl {
    constructor($scope) {
        this.$scope = $scope;
    };

    getPageList() {
        let list = [];
        for (let i = 1; i <= this.pages; i++) {
            list.push(i);
        }
        return list;
    };

    setCurrent(page) {
        this.$scope.$emit('setCurrentPage', page);
    };

}


let Pagination = {
    bindings: {
        pages: '=',
        current: '='
    },
    controller: PaginationCtrl,
    templateUrl: 'components/pagination/pagination.html'
}

export default Pagination;