class HomeCtrl {
	constructor(AppConstants, Elements, Events, $scope) {
		'ngInject';

		this.appName = AppConstants.appName;
		this.$scope = $scope;

		Elements.getAll().then(function (elements) { 
			$scope.$broadcast('setListElements', elements);
		});

		Events.getAll().then(function (events) {
			$scope.$broadcast('setListEvents', events);
		});

	}

}

export default HomeCtrl;
