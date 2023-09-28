

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.0c66c739.js","_app/immutable/chunks/index.aed9335b.js","_app/immutable/chunks/singletons.98ff3d49.js","_app/immutable/chunks/index.516c6601.js"];
export const stylesheets = [];
export const fonts = [];
