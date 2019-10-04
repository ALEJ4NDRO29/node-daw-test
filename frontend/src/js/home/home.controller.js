class HomeCtrl {
  constructor(AppConstants, Elements, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.$scope = $scope;

    Elements.getAll().then(function (elements) { 
      $scope.$broadcast('setListElements', elements);
    });

    // Get list of all tags
    // Tags
    //   .getAll()
    //   .then(
    //     (tags) => {
    //       this.tagsLoaded = true;
    //       this.tags = tags
    //     }
    //   );

    // // Set current list to either feed or all, depending on auth status.
    // this.listConfig = {
    //   type: User.current ? 'feed' : 'all'
    // };

  }

  // changeList(newList) {
  //   this._$scope.$broadcast('setListTo', newList);
  // }


}

export default HomeCtrl;
