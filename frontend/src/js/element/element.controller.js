class ElementCtrl {
    constructor($stateParams, $rootScope) {
        console.log("element const " + $stateParams.slug);
        
        $rootScope.title = 'Element ' +  $stateParams.slug;
    }
}

export default ElementCtrl;