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
		client: {"start":"_app/immutable/entry/start.0dc6ec95.js","app":"_app/immutable/entry/app.a590fa0a.js","imports":["_app/immutable/entry/start.0dc6ec95.js","_app/immutable/chunks/index.9c56d3c2.js","_app/immutable/chunks/singletons.31283f0f.js","_app/immutable/entry/app.a590fa0a.js","_app/immutable/chunks/index.9c56d3c2.js"],"stylesheets":[],"fonts":[]},
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
