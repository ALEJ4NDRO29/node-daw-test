export default class Login {
  constructor(AppConstants, JWT, $q, $http, $state, $stateParams) {
    'ngInject';

    this.AppConstants = AppConstants;
    this.$http = $http;
    this.JWT = JWT;
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;

    this.currentUser = null;
  }

  register(registerData) {
    return this.$http({
      url: this.AppConstants.api + '/login/register',
      method: 'POST',
      data: registerData,
    }).then((res) => {
      this.currentUser = res.data;
      return res;
    });
  }

  login(loginData) {
    return this.$http({
      url: this.AppConstants.api + '/login/',
      method: 'POST',
      data: {
        user: loginData
      }
    }).then((res) => {

      this.currentUser = res.data;

      return res;
    }).catch((err) => {
      return err;
    })
  }

  verifyAuth() {
    let deferred = this.$q.defer();

    // check for JWT token
    if (!this.JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }

    if (this.currentUser) {
      deferred.resolve(true);

    } else {

      this.$http({
        url: this.AppConstants.api + '/login/',
        method: 'GET',
        headers: {
          Authorization: 'Token ' + this.JWT.get()
        }
      }).then(
        (res) => {
          this.currentUser = res.data;
          this.JWT.save(res.data.token);
          console.log(this.currentUser);

          deferred.resolve(true);

          // this.$state.go(this.$state.current, {}, {reload: true});

          // this.$state.transitionTo(this.$state.current, this.$stateParams, {
          //   reload: true,
          //   inherit: false,
          //   notify: true
          // });
        },

        (err) => {
          this.JWT.destroy();
          deferred.resolve(false);
        }
      )
    }

    return deferred.promise;
  }
}