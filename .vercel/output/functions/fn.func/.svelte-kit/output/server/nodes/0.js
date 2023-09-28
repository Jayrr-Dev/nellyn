

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.ace41905.js","_app/immutable/chunks/index.55486355.js"];
export const stylesheets = ["_app/immutable/assets/0.47688bfb.css"];
export const fonts = [];
