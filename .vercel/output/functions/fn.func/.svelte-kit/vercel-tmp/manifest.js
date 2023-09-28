export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon"},
	_: {
		client: {"start":"_app/immutable/entry/start.30b95026.js","app":"_app/immutable/entry/app.c40ace90.js","imports":["_app/immutable/entry/start.30b95026.js","_app/immutable/chunks/index.55486355.js","_app/immutable/chunks/singletons.a2682834.js","_app/immutable/entry/app.c40ace90.js","_app/immutable/chunks/index.55486355.js"],"stylesheets":[],"fonts":[]},
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
