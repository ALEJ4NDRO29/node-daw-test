

class AppHeaderCtrl {
  constructor(AppConstants, $scope, Login) {
    'ngInject';

    this.appName = AppConstants.appName;
    // this.currentUser = User.current;
    this.currentUser = Login.currentUser;
    this.Login = Login;

    $scope.$watch('Login.currentUser', (newUser) => {
      this.currentUser = newUser;
    });
  }

  logout() {
    this.Login.logout();
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
