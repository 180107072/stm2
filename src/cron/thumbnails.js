const { CronJob } = require("cron");
const helpers = require("../providers/helpers");
const Locals = require("../providers/locals");
const axios = require("axios");

const url = Locals.config().url;
const apiPrefix = Locals.config().apiPrefix;
function job() {
	axios.get(`${url}/${apiPrefix}/streams`)
		.then(({ data }) => {
			console.log(data);
			let streams = JSON.parse(data);
			if (typeof (streams["live"] !== undefined)) {
				let live_streams = streams["live"];
				for (let stream in live_streams) {
					if (!live_streams.hasOwnProperty(stream)) continue;
					helpers.generateStreamThumbnail(stream);
				}
			}
		})
		.catch((e) => console.log(e));
}

module.exports = new CronJob("*/5 * * * * *", job, null, true);
