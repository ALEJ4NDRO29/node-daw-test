class SuggestionListComp {
    constructor($scope, Prisma) {
        this.Prisma = Prisma;

        $scope.$on('setListSug', () => {         
            var query = `{
                suggestions{
                  createdAt
                  name
                  email
                  content
                }
              }
              `;

            this.Prisma.get(query).then((res) => {
                this.text = res.data.suggestions;
                $scope.$apply();
            });
        });
    }

}

let SuggestionList = {
    controller: SuggestionListComp,
    templateUrl: 'suggestions/suggestionList.html'
}

export default SuggestionList;