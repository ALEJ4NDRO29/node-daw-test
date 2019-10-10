class ElementCtrl {
    constructor(element, $rootScope) {
        this.element = element;

        $rootScope.setPageTitle(this.element.title);

        console.log(element);
    }
}

export default ElementCtrl;