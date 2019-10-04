class ElementListCtrl {

    constructor($scope) {

        this.elementList = {}

        $scope.$on('setListElements', (e, elements) => {
            this.setListElements(elements);
        });

    }

    setListElements(elements) {
        this.elementList = elements;
        console.log(this.elementList); 
    }

}

let ElementList = {
    controller: ElementListCtrl,
    templateUrl: 'components/elements-helpers/element-list.html'
}

export default ElementList;