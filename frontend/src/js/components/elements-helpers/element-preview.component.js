class ElementPreviewCtrl {
    constructor() {}
    
    
    details(params) {
        console.log(params);
    }

}

let ElementPreview = {
    bindings : {
        element : '='
    },
    controller: ElementPreviewCtrl,
    templateUrl: 'components/elements-helpers/element-preview.html'
}

export default ElementPreview;