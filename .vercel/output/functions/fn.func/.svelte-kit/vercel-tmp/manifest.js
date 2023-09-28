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
		client: {"start":"_app/immutable/entry/start.30b2dbd5.js","app":"_app/immutable/entry/app.3e05af8e.js","imports":["_app/immutable/entry/start.30b2dbd5.js","_app/immutable/chunks/index.aed9335b.js","_app/immutable/chunks/singletons.98ff3d49.js","_app/immutable/chunks/index.516c6601.js","_app/immutable/entry/app.3e05af8e.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.aed9335b.js"],"stylesheets":[],"fonts":[]},
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
