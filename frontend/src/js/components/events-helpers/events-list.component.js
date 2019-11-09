class EventListCtrl {
    constructor($scope) {
        this.$scope = $scope;
        this.events = {};

        $scope.$on('setListEvents', (e, events) => {
            this.events = events;
        });

    }
}

let EventList = {
    controller: EventListCtrl,
    templateUrl: 'components/events-helpers/event-list.component.html'
}

export default EventList;