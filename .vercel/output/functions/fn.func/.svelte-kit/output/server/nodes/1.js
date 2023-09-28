

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.bfc6999b.js","_app/immutable/chunks/index.55486355.js","_app/immutable/chunks/singletons.a2682834.js"];
export const stylesheets = [];
export const fonts = [];
