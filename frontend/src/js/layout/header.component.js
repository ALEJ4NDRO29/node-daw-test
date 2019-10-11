class AppHeaderCtrl {
  constructor(AppConstants, $scope, Login) {
    'ngInject';

    this.appName = AppConstants.appName;
    // this.currentUser = User.current;
    this.currentUser = Login.currentUser;

    $scope.$watch('Login.currentUser', (newUser) => {
      this.currentUser = newUser;
    });
  }

  logout() {
    // TODO
    alert('logout')
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
