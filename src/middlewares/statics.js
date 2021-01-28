const path = require("path");
const express = require("express");

function mountStatics(_express) {
	const options = { maxAge: 31557600000 };
	_express.use(express.static(path.join(process.cwd(), "/public"), options));
	return _express;
}

module.exports = mountStatics;
