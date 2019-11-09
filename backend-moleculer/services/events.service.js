'use strict'

const DbService = require("../mixins/db.mixin");

module.exports = {
    name: 'events',
    mixins: [DbService("events")],

    settings: {
        fields: ['id', 'name', 'date']
    },

    actions: {
        getall: {
            async handler(ctx) {
                return this.adapter.find()
            }
        }
    },

    methods : {
        async seed() {
            await this.adapter.insert({
                name: "Event 1",
                date: new Date().toDateString()
            })
            await this.adapter.insert({
                name: "Event 2",
                date: new Date().toDateString()
            })
        }
    },

    async afterConnected() {
        var res = await this.adapter.count();
        if (res == 0) {
            await this.seed();
        }
        
        return res;
    }
}