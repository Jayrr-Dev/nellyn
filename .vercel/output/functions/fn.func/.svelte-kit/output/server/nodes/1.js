

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.467c562b.js","_app/immutable/chunks/index.9c56d3c2.js","_app/immutable/chunks/singletons.31283f0f.js"];
export const stylesheets = [];
export const fonts = [];
