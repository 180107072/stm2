const fs = require("fs");
const path = require("path");

class Log {
	baseDir;
	fileName;
	linePrefix;
	Date = new Date();
	constructor() {
		let _dateString = `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`;
		let _timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;
		this.baseDir = path.join(process.cwd(), "/.logs/");
		this.fileName = `${_dateString}.log`;
		this.linePrefix = `[${_dateString} ${_timeString}]`;
	}

	info(_string) {
		this.addLog("INFO", _string);
	}

	warn(_string) {
		this.addLog("WARN", _string);
	}

	error(_string) {
		console.log("\x1b[31m%s\x1b[0m", "[ERROR] :: " + _string);

		this.addLog("ERROR", _string);
	}
	custom(_filename, _string) {
		this.addLog(_filename, _string);
	}

	addLog(_kind, _string) {
		const _that = this;
		_kind = _kind.toUpperCase();

		fs.open(`${_that.baseDir}${_that.fileName}`, "a", (_err, _fileDescriptor) => {
			if (!_err && _fileDescriptor) {
				fs.appendFile(_fileDescriptor, `${_that.linePrefix} [${_kind}] ${_string}\n`, (_err) => {
					if (!_err) {
						fs.close(_fileDescriptor, (_err) => {
							if (!_err) {
								return true;
							} else {
								return console.log("\x1b[31m%s\x1b[0m", "Error closing log file that was being appended");
							}
						});
					} else {
						return console.log("\x1b[31m%s\x1b[0m", "Error appending to the log file");
					}
				});
			} else {
				return console.log("\x1b[31m%s\x1b[0m", "Error cloudn't open the log file for appending");
			}
		});
	}
}
module.exports = new Log();
