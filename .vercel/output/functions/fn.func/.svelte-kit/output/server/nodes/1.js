

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.c5fc8467.js","_app/immutable/chunks/index.14cc8d2a.js","_app/immutable/chunks/singletons.1860ae22.js","_app/immutable/chunks/index.df3a4ca5.js"];
export const stylesheets = [];
export const fonts = [];
