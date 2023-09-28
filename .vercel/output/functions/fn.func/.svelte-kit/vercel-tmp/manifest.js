export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.81f439ed.js","app":"_app/immutable/entry/app.daae4264.js","imports":["_app/immutable/entry/start.81f439ed.js","_app/immutable/chunks/index.14cc8d2a.js","_app/immutable/chunks/singletons.90fdea8d.js","_app/immutable/chunks/index.df3a4ca5.js","_app/immutable/entry/app.daae4264.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.14cc8d2a.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
