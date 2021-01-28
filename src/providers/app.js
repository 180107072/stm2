const path = require("path");
const dotenv = require("dotenv");
const Job = require("../cron/thumbnails");
const Express = require("./express");
const Database = require("./database");
const App = () => ({
	clearConsole() {
		process.stdout.write("\x1B[2J\x1B[0f");
	},
	locadCron() {
		Job.start();
	},
	loadConfiguration() {
		dotenv.config({ path: path.join(process.cwd(), "/.env") });
	},
	loadDatabase() {
		Database.init();
	},
	loadServer() {
		Express.init();
	},
});

module.exports = App();
