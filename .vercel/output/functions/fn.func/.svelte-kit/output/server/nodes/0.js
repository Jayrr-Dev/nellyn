

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.41f8e98e.js","_app/immutable/chunks/index.9c56d3c2.js"];
export const stylesheets = [];
export const fonts = [];
