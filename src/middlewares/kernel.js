const mountHttp = require("./http");
const mountStatics = require("./statics");

function init(_express) {
	_express = mountHttp(_express);
	_express = mountStatics(_express);
	return _express;
}

module.exports = init;
