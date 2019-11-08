function EventsConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
      .state('app.events', {
        url: '/events',
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
  
  export default EventsConfig;
  