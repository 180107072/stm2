const path = require("path");
const dotenv = require("dotenv");

const Locals = (() => {
	return class {
		get config() {
			dotenv.config({ path: path.join(process.cwd(), "/.env") });
			const port = process.env.PORT || 3000;
			const url = process.env.APP_URL || `http://localhost:${port}`;
			const isCORSEnabled = process.env.CORS_ENABLED || true;
			const apiPrefix = process.env.API_PREFIX || "api";
			const appSecret = process.env.APP_SECRET;
			const mongooseUrl = process.env.MONGOOSE_URL;
			return {
				apiPrefix,
				isCORSEnabled,
				port,
				url,
				appSecret,
				mongooseUrl,
			};
		}
		get rtmpConfig() {
			/**
			 * TODO: create quality selector
			 */
			const secret = process.env.SECRET;
			const ffmpeg = process.env.FFMPEG;
			return {
				logType: 3,
				server: {
					secret: secret,
				},
				rtmp_server: {
					rtmp: {
						port: 1935,
						chunk_size: 30000,
						gop_cache: true,
						ping: 60,
						ping_timeout: 30,
					},
					http: {
						port: 8888,
						mediaroot: "./server/media",
						allow_origin: "*",
					},
					trans: {
						ffmpeg: ffmpeg,
						tasks: [
							{
								app: "live",
								hls: true,
								hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
								dash: true,
								dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
							},
						],
					},
				},
			};
		}
		init(_express) {
			_express.locals.app = this.config();
			return _express;
		}
	};
})();

module.exports = new Locals();
