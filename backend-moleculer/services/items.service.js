'use strict'

const DbService = require("../mixins/db.mixin");

module.exports = {
  name: 'items',
  mixins: [DbService("items")],

  settings: {
    fields: ['id', 'name', 'weight']
  },

  actions: {

    get: {
      params: {
        id: 'string'
      },
      handler(ctx) {
				console.log('****ctx.params get*****');
        		console.log(ctx.params);
        
				return this.findByID(ctx.params.id)
					.then(entity => {
						console.log('****entity get*****');
						console.log(entity);
						return entity;
					})
			}
    },	

    getAll: {
      handler(ctx) {
				console.log('****ctx.params*****');
				console.log(ctx.params);

				return this.adapter.find()
					.then(entity => {
						console.log('****entity*****');
						console.log(entity);
						return entity;
					})
			}
    },
  },

  methods: {
    findByID(id) {
	  return this.adapter.findOne({ "_id": id });
    },
    
		seedDB() {
			this.logger.info("Seed Items DB...");
			return Promise.resolve()
				.then(() => this.adapter.insert({
					name: "john",
					weight: 25
				}))
				.then(() => this.adapter.insert({
					name: "sara",
					weight: 25
				}))
    },
	},

	afterConnected() {
		return this.adapter.count().then(count => {
			if (count == 0) {
				this.seedDB();
			}
		});
	}

}
