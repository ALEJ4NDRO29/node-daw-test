class ElementLikeCtrl {
    constructor(Login, $state, Elements) {
        this._Login = Login;
        this._$state = $state;
        this._Elements = Elements;
    }

    like() {
        try {
            if(!this._Login.currentUser) {
                this._$state.go('app.login');
                return;
            }

            if(this.element.isRated) {
                this._Elements.unlike(this.element.slug).then((response) => {
                    this.element = response.data;
                });
            } else {
                this._Elements.like(this.element.slug).then((response) => {
                    this.element = response.data;
                });
            }

            console.log(this.element);

            
        } catch(error) {

        }
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