function ElementConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.element', {
      url: '/element/:slug',
      controller: 'ElementCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'element/element.html',
      title: 'Element - '
    });
  
  };
  
  export default ElementConfig;
  