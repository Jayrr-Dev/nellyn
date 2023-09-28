

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.d5e6da02.js","_app/immutable/chunks/index.aed9335b.js"];
export const stylesheets = [];
export const fonts = [];
