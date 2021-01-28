const express = require("express");
const Locals = require("./locals");
const Routes = require("./routes");
const initMiddlewares = require("../middlewares/kernel");

const Express = (() => {
	return class {
		constructor() {
			this.express = express();
			this.mountDotEnv();
			this.mountRoutes();
			this.mountMiddlewares();
		}
		mountDotEnv() {
			this.express = Locals.init(this.express);
		}
		mountMiddlewares() {
			this.express = initMiddlewares(this.express);
		}
		mountRoutes() {
			this.express = Routes.home(this.express);
		}
		init() {
			const { port } = Locals.config();
			this.express.listen(port, () => console.log(`==> Server :: Running @ 'http://localhost:${port}'`));
		}
	};
})();

module.exports = new Express();
