

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d5d9e41c.js","_app/immutable/chunks/index.55486355.js","_app/immutable/chunks/singletons.bd7ce95e.js"];
export const stylesheets = [];
export const fonts = [];
