class ElementListCtrl {

    constructor($scope) {
        this.allElements = {};
        this.elementList = {};
        this.currentPage = 1;
        this.pages = 0;

        $scope.$on('setListElements', (e, elements) => {
            this.allElements = elements;
            this.setListElements();
        });


        $scope.$on('setCurrentPage', (e, currentPage) => {
            this.currentPage = currentPage;
            this.setListElements();
        });


    }

    setListElements() {
        let elements = this.allElements;
        let size = Object.keys(elements).length;

        if (typeof this.limit === 'undefined') {
            this.limit = size;
        }

        this.pages = Math.ceil(size / this.limit);

        this.elementList = {};

        for (let i = 0; i < this.limit; i++) {
            let index = this.limit * (this.currentPage - 1);
            
            let getIndex = index + i;
            if (getIndex >= size) {
                break;
            }
            
            this.elementList[i] = elements[i + index];
        }

    }

}

let ElementList = {
    bindings: {
        limit: '='
    },
    controller: ElementListCtrl,
    templateUrl: 'components/elements-helpers/element-list.html'
}

export default ElementList;