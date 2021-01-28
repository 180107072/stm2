const { Router } = require("express");

const _ = Router();

_.get("/", (req, res) => {
	res.json({
		msg: "Hello func",
	});
});

_.get("/streams", (req, res) =>
	res.json({
		msg: "stream",
	})
);

module.exports = _;
