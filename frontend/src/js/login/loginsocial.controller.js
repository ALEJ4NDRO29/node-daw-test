class LoginSocial {
    constructor(Login, Toastr, $state) {
        Login.login(null, 'sociallogin').then(function (res) {
            if (res.status === 200) {
                Toastr.success('Logged successfully');
            } else {
                Toastr.warning('There was a problem logging in');
            }
            $state.go('app.home', {}, {location: 'replace'});
        })
    }
}

export default LoginSocial;