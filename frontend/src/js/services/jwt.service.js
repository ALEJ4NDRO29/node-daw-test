export default class JWT {
  constructor(AppConstants, $window, $cookies) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$window = $window;
    this.$cookies = $cookies;
  }

  save(token) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    this.$cookies.put(this._AppConstants.jwtKey, token, {'expires' : expireDate});
  }

  get() {
    return this.$cookies.get(this._AppConstants.jwtKey);
  }

  destroy() {
    this.$cookies.remove(this._AppConstants.jwtKey);
  }

}
