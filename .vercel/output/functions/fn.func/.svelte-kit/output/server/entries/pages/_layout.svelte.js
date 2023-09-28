import { c as create_ssr_component } from "../../chunks/index.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1yq19x8_START -->${$$result.title = `<title>SvelteKit Deployment Configuration</title>`, ""}<meta name="description" content="Learn how to configuration your SvelteKit app to use Edge Functions, Serverless Functions, and Incremental Static Regeneration on Vercel"><!-- HEAD_svelte-1yq19x8_END -->`, ""}

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
