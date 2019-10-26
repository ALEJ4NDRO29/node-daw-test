function AdminPaneConfig($stateProvider) {
    $stateProvider.state('app.adminpane', {
        url: '/adminpane',
        controller: 'AdminPaneCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'adminpane/adminpane.html',
        title: 'Admin Pane',
        resolve: {
            users: function (Graphql) {
                var query = `{users {
                    username,
                    admin
                        likes {
                            title,
                            rate
                        }
                    }
                }`;
                return Graphql.get(query);
            }
        }
    });
}

export default AdminPaneConfig;