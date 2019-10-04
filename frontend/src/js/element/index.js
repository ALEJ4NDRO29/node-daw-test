import angular from 'angular';

let elementModule = angular.module('app.element', []);

import ElementConfig from './element.config';
elementModule.config(ElementConfig);

import ElementCtrl from './element.controller';
elementModule.controller('ElementCtrl', ElementCtrl);

export default elementModule;
