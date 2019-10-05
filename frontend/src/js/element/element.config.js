function ElementConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.element', {
      url: '/element/:slug',
      controller: 'ElementCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'element/element.html',
      title: 'Element - ',
      resolve: {
        element: function (Elements, $stateParams) {
          return Elements.findOne($stateParams.slug);
        }
      }
    });

};

export default ElementConfig;
