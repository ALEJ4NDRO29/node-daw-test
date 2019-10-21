class ElementCtrl {
    constructor(element, $rootScope) {
        this.element = element.data;
        
        $rootScope.setPageTitle(this.element.title);

        console.log(this.element);
    }
}

export default ElementCtrl;