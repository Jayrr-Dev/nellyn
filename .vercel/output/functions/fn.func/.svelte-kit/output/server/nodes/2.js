

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.446d540b.js","_app/immutable/chunks/index.aed9335b.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.516c6601.js"];
export const stylesheets = ["_app/immutable/assets/2.c7919047.css"];
export const fonts = [];
