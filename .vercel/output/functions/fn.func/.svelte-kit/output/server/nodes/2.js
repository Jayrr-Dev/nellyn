

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.c0fd066a.js","_app/immutable/chunks/index.55486355.js"];
export const stylesheets = [];
export const fonts = [];
