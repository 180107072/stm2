const mongoose = require("mongoose");
const Locals = require("./locals");

class Database {
	static init() {
		const dsn = Locals.config().mongooseUrl;
		const options = { useNewUrlParser: true, useUnifiedTopology: true };

		mongoose.set("useCreateIndex", true);

		mongoose.connect(dsn, options, (error) => {
			if (error) {
				console.log(error);
				throw error;
			} else {
				console.log("connected to mongo server at: " + dsn);
			}
		});
	}
}

module.exports = Database;
