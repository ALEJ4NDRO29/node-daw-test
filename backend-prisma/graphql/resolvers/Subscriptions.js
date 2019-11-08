var Subscription = {
    onNewSuggestion : {
        subscribe: async (parent, args, context) => {
            return context.prisma.$subscribe
              .suggestion({
                mutation_in: ['CREATED', 'UPDATED'],
              })
              .node()
          },
          resolve: payload => {
            return payload
          }
    }
}

module.exports = Subscription