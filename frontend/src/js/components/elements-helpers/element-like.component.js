class ElementLikeCtrl {
    constructor() {}

    like() {
        console.log('like');
        console.log(this.element);        
    }
}

let ElementLike = {
    bindings : {
        element : '='
    },
    controller : ElementLikeCtrl,
    templateUrl: 'components/elements-helpers/element-like.html'
}

export default ElementLike;