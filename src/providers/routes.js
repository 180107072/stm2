const Locals = require("./locals");
const homeRouter = require("./../routes/home");

const Routes = () => ({
	home(_express) {
		const apiPrefix = Locals.config().apiPrefix;
		console.log("Routes :: Mounting API Routes...");
		return _express.use(`/${apiPrefix}`, homeRouter);
	},
});

module.exports = Routes();
