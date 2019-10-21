class ProfileCtrl {
    constructor(user, Login, Elements, $scope) {
        this.user = user;
        this.likes = {};
        this.showLikes = false;

        if (Login.currentUser && Login.currentUser.username === user.username) {
            Elements.myLikes()
                .then((elements) => {
                    this.likes = elements.data;
                    this.showLikes = Object.keys(this.likes).length !== 0;
                    
                    $scope.$broadcast('setListElements', elements.data);
                });
        }
    }
}

export default ProfileCtrl;