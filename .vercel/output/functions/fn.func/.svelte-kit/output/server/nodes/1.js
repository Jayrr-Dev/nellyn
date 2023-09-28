

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.936ad493.js","_app/immutable/chunks/index.9c56d3c2.js","_app/immutable/chunks/singletons.acf5eb5f.js"];
export const stylesheets = [];
export const fonts = [];
