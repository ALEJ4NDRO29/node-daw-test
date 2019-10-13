class LoginCtrl {
    constructor(Login, Toastr, JWT, $state, AppConstants) {
        'ngInject';

        this.Toastr = Toastr;
        this.Login = Login;
        this.JWT = JWT;
        this.registerUser = false;
        this.$state = $state;
        this.registerData = {
            username: 'alej4',
            email: 'josealejandro.r.29@gmail.com',
            password: '123456'
        };
        this.loginData = {
            username: 'alej4',
            password: '123456'
        };

        this.githubLoginUrl = AppConstants.api + '/login/github';
    }

    alternateForm() {
        this.registerUser = !this.registerUser;
    }

    login() {
        let hasErrors = false;

        if (!this.loginData.username) {
            this.Toastr.error('Invalid username');
            hasErrors = true;
        }
        if (!this.loginData.password) {
            this.Toastr.error('Invalid password');
            hasErrors = true;
        }

        if (hasErrors) return;

        // let _jwt = this.JWT;
        let _Toastr = this.Toastr;
        let _$state = this.$state;

        this.Login.login(this.loginData).then(function (response) {
            if (response.status == 200) {
                _Toastr.success("Logged successfully")
                // _jwt.save(response.data.token);
                _$state.go('app.home');
            } else {
                _Toastr.error('Invalid username or password')
            }
        });
    }

    register() {
        var hasErrors;
        if (!this.registerData.username) {
            this.Toastr.error('Invalid username');
            hasErrors = true;
        }
        if (!this.registerData.email) {
            this.Toastr.error('Invalid email');
            hasErrors = true;
        }
        if (!this.registerData.password) {
            this.Toastr.error('Invalid password');
            hasErrors = true;
        }
        if (hasErrors) return;

        let _jwt = this.JWT;

        this.Login.register(this.registerData).then(function (response) {
            if (response.status == 200) {
                _jwt.save(response.data.token);
            }
        });
    }

}

export default LoginCtrl;