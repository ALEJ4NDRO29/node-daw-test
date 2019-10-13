class UserSettignsFormComp {
    constructor($scope, Login, Toastr){
        this.noUpgradeableFields = {}
        this.upgradeableFields = {}
        this.Login = Login;
        this.Toastr = Toastr;

        Login.getNoUpgradeableFields().then( (data) => {
            var tmp = this.noUpgradeableFields;
            Object.keys(data).forEach(function(key) {
                tmp[key] = data[key];
            })
        });

        Login.getUpgradeableFields().then( (data) => {
            var tmp = this.upgradeableFields;
            Object.keys(data).forEach(function(key) {
                tmp[key] = data[key];
            })
        });

        $scope.$on('upgradeUserSettings', () => {
            this.upgrade();
        });
    }

    upgrade() {
        var tmpToastr = this.Toastr;
        this.Login.upgrade(this.upgradeableFields).then(function (res) {
            res.status === 200 ? tmpToastr.success('Updated') : tmpToastr.error('Error');
        });
    }

    noUpChange(key, value) {
        this.upgradeableFields[key] = value ? value : null;
    }

    capitalizeFLetter(input) { 
        let string = input; 
        return string[0].toUpperCase() + string.slice(1);
    } 
}

let userSettignsForm = {
    controller: UserSettignsFormComp,
    templateUrl: 'usersettings/usersettignsform.html'
}

export default userSettignsForm;