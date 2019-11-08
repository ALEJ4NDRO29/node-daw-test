import angular from 'angular';

let eventsModule = angular.module('app.events', []);

import EventsConfig from './events.config';
eventsModule.config(EventsConfig);

import EventsCtrl from './events.controller';
eventsModule.controller(EventsCtrl);

export default eventsModule;