"use strict";

const path = require("path");
const mkdir = require("mkdirp").sync;

const DbService	= require("moleculer-db");

// process.env.MONGO_URI = "mongodb://mongo/test_moleculer_db";

module.exports = function(collection) {
	// console.log(process.env.MONGO_URI);
	
	// if (process.env.MONGO_URI) {
		// Mongo adapter
		const MongoAdapter = require("moleculer-db-adapter-mongo");

		return {
			mixins: [DbService],
			adapter: new MongoAdapter("mongodb://mongo/test_moleculer_db"),
			collection
		};
	// }

	// --- NeDB fallback DB adapter
	
	// Create data folder
	mkdir(path.resolve("./data"));

	return {
		mixins: [DbService],
		adapter: new DbService.MemoryAdapter({ filename: `./data/${collection}.db` })
	};
};