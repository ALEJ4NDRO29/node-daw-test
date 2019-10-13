import angular from 'angular';

// Create the module where our functionality can attach to
let userSettingsModule = angular.module('app.usersettings', []);

// Include our UI-Router config settings
import userSettingsConfig from './usersettings.config';
userSettingsModule.config(userSettingsConfig);

// Include controllers
import userSettingsCtrl from './usersettings.controller';
userSettingsModule.controller('UserSettingsCtrl', userSettingsCtrl);

import userSettignsForm from './usersettingsform.component';
userSettingsModule.component('userSettignsForm', userSettignsForm);

export default userSettingsModule;