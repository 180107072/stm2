const lusca = require("lusca");
const Locals = require("../providers/locals");

const CsrfToken = (() => {
	return class {
		mount(_express) {
			_express.set("trust proxy", 1);

			_express.use((req, res, next) => {
				res.locals.user = req.user;
				res.locals.app = Locals.config();
				next();
			});

			_express.use((req, res, next) => {
				const apiPrefix = Locals.config().apiPrefix;

				if (req.originalUrl.includes(`/${apiPrefix}/`)) {
					next();
				} else {
					lusca.csrf()(req, res, next);
				}
			});

			_express.use(lusca.xframe("SAMEORIGIN"));

			_express.use(lusca.xssProtection(true));

			_express.use((req, res, next) => {
				if (!req.user && req.path !== "/login" && req.path !== "/signup" && !req.path.match(/^\/auth/) && !req.path.match(/\./)) {
					req.session.returnTo = req.originalUrl;
				} else if (req.user && (req.path === "/account" || req.path.match(/^\/api/))) {
					req.session.returnTo = req.originalUrl;
				}
				next();
			});

			return _express;
		}
	};
})();

module.exports = new CsrfToken();
