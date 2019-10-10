import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import ArticlesService from './articles.service';
servicesModule.service('Articles', ArticlesService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);

import SuggestionService from './suggestions.service';
servicesModule.service('Suggestions', SuggestionService);

import ToastrService from './toastr.service';
servicesModule.service('Toastr', ToastrService);

import ElementsService from './elements.service';
servicesModule.service('Elements', ElementsService);

import LoginService from './login.service';
servicesModule.service('Login', LoginService);

export default servicesModule;
