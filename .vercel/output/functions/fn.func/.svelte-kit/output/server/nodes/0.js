

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.8958cd26.js","_app/immutable/chunks/index.14cc8d2a.js"];
export const stylesheets = ["_app/immutable/assets/0.47688bfb.css"];
export const fonts = [];
