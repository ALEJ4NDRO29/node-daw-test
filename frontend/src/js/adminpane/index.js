import angular from 'angular';

let adminPaneModule = angular.module('app.adminpane', []);

import AdminPaneConfig from './adminpane.config';
adminPaneModule.config(AdminPaneConfig);

import AdminPaneCtrl from './adminpane.controller';
adminPaneModule.controller('AdminPaneCtrl', AdminPaneCtrl);

export default adminPaneModule;