const child_proc = require("child_process");
const path = require("path");
const fs = require("fs");
const Locals = require("./locals");

const GenerateStreamThumbnail = ((stream_key) => {
	return class {
		spawn() {
			const args = [
				"-y",
				"-i",
				"http://127.0.0.1:8888/live/" + stream_key + "/index.m3u8",
				"-ss",
				"00:00:01",
				"-vframes",
				"1",
				"-vf",
				"scale=-2:300",
				path.join(dir + stream_key + ".png"),
			];
			const cmd = Locals.rtmp_server.trans.ffmpeg;
			child_proc
				.spawn(cmd, args, {
					detached: true,
					stdio: "ignore",
				})
				.unref();
		}
	};
})();

module.exports = new GenerateStreamThumbnail();
