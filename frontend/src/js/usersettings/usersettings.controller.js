class UserSettingsCtrl {
    constructor($scope) {
        this.$scope = $scope;
    }

    upgradeProfile() {
        this.$scope.$broadcast('upgradeUserSettings');
    }

}

export default UserSettingsCtrl;