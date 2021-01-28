const cors = require("cors");
const flash = require("express-flash");
const compress = require("compression");
const bodyParser = require("body-parser");
const session = require("express-session");
const connect = require("connect-mongo");
const Locals = require("../providers/locals");

const MongoStore = connect(session);

function mountHttp(_express) {
	const bpUploadLimit = bodyParser.json({
		limit: Locals.config().maxUploadLimit,
	});
	const bpUrlEncoded = bodyParser.urlencoded({
		limit: Locals.config().maxUploadLimit,
		parameterLimit: Locals.config().maxParameterLimit,
		extended: false,
	});
	const options = {
		resave: true,
		saveUninitialized: true,
		secret: Locals.config().appSecret,
		cookie: {
			maxAge: 1209600000,
		},
		store: new MongoStore({
			url: process.env.MONGOOSE_URL,
			autoReconnect: true,
		}),
	};
	const unnecessaryHeader = "x-powered-by";

	_express.disable(unnecessaryHeader);
	_express.use(session(options));
	_express.use(flash());
	_express.use(bpUploadLimit);
	_express.use(bpUrlEncoded);
	_express.use(cors());
	_express.use(compress());

	return _express;
}

module.exports = mountHttp;
