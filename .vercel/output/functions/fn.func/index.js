globalThis.global = globalThis;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/index2.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
function set_current_component(component4) {
  current_component = component4;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component4 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component4.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component4, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function validate_component(component4, name) {
  if (!component4 || !component4.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
  }
  return component4;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
var current_component, _boolean_attributes, boolean_attributes, invalid_attribute_name_character, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    _boolean_attributes = [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "itemscope",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/index.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    init_index2();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index4 = 0;
      while (index4 < str.length) {
        var eqIdx = str.indexOf("=", index4);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index4);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index4 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index4, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index4 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/pages/_layout.ts.js
var layout_ts_exports = {};
var init_layout_ts = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.ts.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_index2();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<!-- HEAD_svelte-1vd6g7i_START -->${$$result.title = `<title>Happy Birthday!</title>`, ""}<meta name="description" content="Learn how to configuration your SvelteKit app to use Edge Functions, Serverless Functions, and Incremental Static Regeneration on Vercel"><!-- HEAD_svelte-1vd6g7i_END -->`, ""}

${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets,
  universal: () => layout_ts_exports,
  universal_id: () => universal_id
});
var index, component_cache, component, universal_id, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_ts();
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    universal_id = "src/routes/+layout.ts";
    imports = ["_app/immutable/nodes/0.e8f95c69.js", "_app/immutable/chunks/index.51f98ca3.js"];
    stylesheets = ["_app/immutable/assets/0.ab465080.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
var getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index2();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1>
<p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.982a94e1.js", "_app/immutable/chunks/index.51f98ca3.js", "_app/immutable/chunks/singletons.d6fefa03.js", "_app/immutable/chunks/index.4da43e74.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// node_modules/svelte-sound/dist/howler.core-e669a980.js
var howler_core_e669a980_exports = {};
__export(howler_core_e669a980_exports, {
  h: () => howler_core
});
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var commonjsGlobal, howler_core$1, howler_core;
var init_howler_core_e669a980 = __esm({
  "node_modules/svelte-sound/dist/howler.core-e669a980.js"() {
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    howler_core$1 = {};
    (function(exports) {
      (function() {
        var HowlerGlobal = function() {
          this.init();
        };
        HowlerGlobal.prototype = {
          /**
           * Initialize the global Howler object.
           * @return {Howler}
           */
          init: function() {
            var self2 = this || Howler;
            self2._counter = 1e3;
            self2._html5AudioPool = [];
            self2.html5PoolSize = 10;
            self2._codecs = {};
            self2._howls = [];
            self2._muted = false;
            self2._volume = 1;
            self2._canPlayEvent = "canplaythrough";
            self2._navigator = typeof window !== "undefined" && window.navigator ? window.navigator : null;
            self2.masterGain = null;
            self2.noAudio = false;
            self2.usingWebAudio = true;
            self2.autoSuspend = true;
            self2.ctx = null;
            self2.autoUnlock = true;
            self2._setup();
            return self2;
          },
          /**
           * Get/set the global volume for all sounds.
           * @param  {Float} vol Volume from 0.0 to 1.0.
           * @return {Howler/Float}     Returns self or current volume.
           */
          volume: function(vol) {
            var self2 = this || Howler;
            vol = parseFloat(vol);
            if (!self2.ctx) {
              setupAudioContext();
            }
            if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
              self2._volume = vol;
              if (self2._muted) {
                return self2;
              }
              if (self2.usingWebAudio) {
                self2.masterGain.gain.setValueAtTime(vol, Howler.ctx.currentTime);
              }
              for (var i = 0; i < self2._howls.length; i++) {
                if (!self2._howls[i]._webAudio) {
                  var ids = self2._howls[i]._getSoundIds();
                  for (var j = 0; j < ids.length; j++) {
                    var sound = self2._howls[i]._soundById(ids[j]);
                    if (sound && sound._node) {
                      sound._node.volume = sound._volume * vol;
                    }
                  }
                }
              }
              return self2;
            }
            return self2._volume;
          },
          /**
           * Handle muting and unmuting globally.
           * @param  {Boolean} muted Is muted or not.
           */
          mute: function(muted) {
            var self2 = this || Howler;
            if (!self2.ctx) {
              setupAudioContext();
            }
            self2._muted = muted;
            if (self2.usingWebAudio) {
              self2.masterGain.gain.setValueAtTime(muted ? 0 : self2._volume, Howler.ctx.currentTime);
            }
            for (var i = 0; i < self2._howls.length; i++) {
              if (!self2._howls[i]._webAudio) {
                var ids = self2._howls[i]._getSoundIds();
                for (var j = 0; j < ids.length; j++) {
                  var sound = self2._howls[i]._soundById(ids[j]);
                  if (sound && sound._node) {
                    sound._node.muted = muted ? true : sound._muted;
                  }
                }
              }
            }
            return self2;
          },
          /**
           * Handle stopping all sounds globally.
           */
          stop: function() {
            var self2 = this || Howler;
            for (var i = 0; i < self2._howls.length; i++) {
              self2._howls[i].stop();
            }
            return self2;
          },
          /**
           * Unload and destroy all currently loaded Howl objects.
           * @return {Howler}
           */
          unload: function() {
            var self2 = this || Howler;
            for (var i = self2._howls.length - 1; i >= 0; i--) {
              self2._howls[i].unload();
            }
            if (self2.usingWebAudio && self2.ctx && typeof self2.ctx.close !== "undefined") {
              self2.ctx.close();
              self2.ctx = null;
              setupAudioContext();
            }
            return self2;
          },
          /**
           * Check for codec support of specific extension.
           * @param  {String} ext Audio file extention.
           * @return {Boolean}
           */
          codecs: function(ext) {
            return (this || Howler)._codecs[ext.replace(/^x-/, "")];
          },
          /**
           * Setup various state values for global tracking.
           * @return {Howler}
           */
          _setup: function() {
            var self2 = this || Howler;
            self2.state = self2.ctx ? self2.ctx.state || "suspended" : "suspended";
            self2._autoSuspend();
            if (!self2.usingWebAudio) {
              if (typeof Audio !== "undefined") {
                try {
                  var test = new Audio();
                  if (typeof test.oncanplaythrough === "undefined") {
                    self2._canPlayEvent = "canplay";
                  }
                } catch (e) {
                  self2.noAudio = true;
                }
              } else {
                self2.noAudio = true;
              }
            }
            try {
              var test = new Audio();
              if (test.muted) {
                self2.noAudio = true;
              }
            } catch (e) {
            }
            if (!self2.noAudio) {
              self2._setupCodecs();
            }
            return self2;
          },
          /**
           * Check for browser support for various codecs and cache the results.
           * @return {Howler}
           */
          _setupCodecs: function() {
            var self2 = this || Howler;
            var audioTest = null;
            try {
              audioTest = typeof Audio !== "undefined" ? new Audio() : null;
            } catch (err) {
              return self2;
            }
            if (!audioTest || typeof audioTest.canPlayType !== "function") {
              return self2;
            }
            var mpegTest = audioTest.canPlayType("audio/mpeg;").replace(/^no$/, "");
            var ua = self2._navigator ? self2._navigator.userAgent : "";
            var checkOpera = ua.match(/OPR\/([0-6].)/g);
            var isOldOpera = checkOpera && parseInt(checkOpera[0].split("/")[1], 10) < 33;
            var checkSafari = ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1;
            var safariVersion = ua.match(/Version\/(.*?) /);
            var isOldSafari = checkSafari && safariVersion && parseInt(safariVersion[1], 10) < 15;
            self2._codecs = {
              mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType("audio/mp3;").replace(/^no$/, ""))),
              mpeg: !!mpegTest,
              opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
              ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType("audio/wav")).replace(/^no$/, ""),
              aac: !!audioTest.canPlayType("audio/aac;").replace(/^no$/, ""),
              caf: !!audioTest.canPlayType("audio/x-caf;").replace(/^no$/, ""),
              m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              m4b: !!(audioTest.canPlayType("audio/x-m4b;") || audioTest.canPlayType("audio/m4b;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              mp4: !!(audioTest.canPlayType("audio/x-mp4;") || audioTest.canPlayType("audio/mp4;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              weba: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
              webm: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
              dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
              flac: !!(audioTest.canPlayType("audio/x-flac;") || audioTest.canPlayType("audio/flac;")).replace(/^no$/, "")
            };
            return self2;
          },
          /**
           * Some browsers/devices will only allow audio to be played after a user interaction.
           * Attempt to automatically unlock audio on the first user interaction.
           * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
           * @return {Howler}
           */
          _unlockAudio: function() {
            var self2 = this || Howler;
            if (self2._audioUnlocked || !self2.ctx) {
              return;
            }
            self2._audioUnlocked = false;
            self2.autoUnlock = false;
            if (!self2._mobileUnloaded && self2.ctx.sampleRate !== 44100) {
              self2._mobileUnloaded = true;
              self2.unload();
            }
            self2._scratchBuffer = self2.ctx.createBuffer(1, 1, 22050);
            var unlock = function(e) {
              while (self2._html5AudioPool.length < self2.html5PoolSize) {
                try {
                  var audioNode = new Audio();
                  audioNode._unlocked = true;
                  self2._releaseHtml5Audio(audioNode);
                } catch (e2) {
                  self2.noAudio = true;
                  break;
                }
              }
              for (var i = 0; i < self2._howls.length; i++) {
                if (!self2._howls[i]._webAudio) {
                  var ids = self2._howls[i]._getSoundIds();
                  for (var j = 0; j < ids.length; j++) {
                    var sound = self2._howls[i]._soundById(ids[j]);
                    if (sound && sound._node && !sound._node._unlocked) {
                      sound._node._unlocked = true;
                      sound._node.load();
                    }
                  }
                }
              }
              self2._autoResume();
              var source = self2.ctx.createBufferSource();
              source.buffer = self2._scratchBuffer;
              source.connect(self2.ctx.destination);
              if (typeof source.start === "undefined") {
                source.noteOn(0);
              } else {
                source.start(0);
              }
              if (typeof self2.ctx.resume === "function") {
                self2.ctx.resume();
              }
              source.onended = function() {
                source.disconnect(0);
                self2._audioUnlocked = true;
                document.removeEventListener("touchstart", unlock, true);
                document.removeEventListener("touchend", unlock, true);
                document.removeEventListener("click", unlock, true);
                document.removeEventListener("keydown", unlock, true);
                for (var i2 = 0; i2 < self2._howls.length; i2++) {
                  self2._howls[i2]._emit("unlock");
                }
              };
            };
            document.addEventListener("touchstart", unlock, true);
            document.addEventListener("touchend", unlock, true);
            document.addEventListener("click", unlock, true);
            document.addEventListener("keydown", unlock, true);
            return self2;
          },
          /**
           * Get an unlocked HTML5 Audio object from the pool. If none are left,
           * return a new Audio object and throw a warning.
           * @return {Audio} HTML5 Audio object.
           */
          _obtainHtml5Audio: function() {
            var self2 = this || Howler;
            if (self2._html5AudioPool.length) {
              return self2._html5AudioPool.pop();
            }
            var testPlay = new Audio().play();
            if (testPlay && typeof Promise !== "undefined" && (testPlay instanceof Promise || typeof testPlay.then === "function")) {
              testPlay.catch(function() {
                console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
              });
            }
            return new Audio();
          },
          /**
           * Return an activated HTML5 Audio object to the pool.
           * @return {Howler}
           */
          _releaseHtml5Audio: function(audio) {
            var self2 = this || Howler;
            if (audio._unlocked) {
              self2._html5AudioPool.push(audio);
            }
            return self2;
          },
          /**
           * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
           * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
           * @return {Howler}
           */
          _autoSuspend: function() {
            var self2 = this;
            if (!self2.autoSuspend || !self2.ctx || typeof self2.ctx.suspend === "undefined" || !Howler.usingWebAudio) {
              return;
            }
            for (var i = 0; i < self2._howls.length; i++) {
              if (self2._howls[i]._webAudio) {
                for (var j = 0; j < self2._howls[i]._sounds.length; j++) {
                  if (!self2._howls[i]._sounds[j]._paused) {
                    return self2;
                  }
                }
              }
            }
            if (self2._suspendTimer) {
              clearTimeout(self2._suspendTimer);
            }
            self2._suspendTimer = setTimeout(function() {
              if (!self2.autoSuspend) {
                return;
              }
              self2._suspendTimer = null;
              self2.state = "suspending";
              var handleSuspension = function() {
                self2.state = "suspended";
                if (self2._resumeAfterSuspend) {
                  delete self2._resumeAfterSuspend;
                  self2._autoResume();
                }
              };
              self2.ctx.suspend().then(handleSuspension, handleSuspension);
            }, 3e4);
            return self2;
          },
          /**
           * Automatically resume the Web Audio AudioContext when a new sound is played.
           * @return {Howler}
           */
          _autoResume: function() {
            var self2 = this;
            if (!self2.ctx || typeof self2.ctx.resume === "undefined" || !Howler.usingWebAudio) {
              return;
            }
            if (self2.state === "running" && self2.ctx.state !== "interrupted" && self2._suspendTimer) {
              clearTimeout(self2._suspendTimer);
              self2._suspendTimer = null;
            } else if (self2.state === "suspended" || self2.state === "running" && self2.ctx.state === "interrupted") {
              self2.ctx.resume().then(function() {
                self2.state = "running";
                for (var i = 0; i < self2._howls.length; i++) {
                  self2._howls[i]._emit("resume");
                }
              });
              if (self2._suspendTimer) {
                clearTimeout(self2._suspendTimer);
                self2._suspendTimer = null;
              }
            } else if (self2.state === "suspending") {
              self2._resumeAfterSuspend = true;
            }
            return self2;
          }
        };
        var Howler = new HowlerGlobal();
        var Howl = function(o) {
          var self2 = this;
          if (!o.src || o.src.length === 0) {
            console.error("An array of source files must be passed with any new Howl.");
            return;
          }
          self2.init(o);
        };
        Howl.prototype = {
          /**
           * Initialize a new Howl group object.
           * @param  {Object} o Passed in properties for this group.
           * @return {Howl}
           */
          init: function(o) {
            var self2 = this;
            if (!Howler.ctx) {
              setupAudioContext();
            }
            self2._autoplay = o.autoplay || false;
            self2._format = typeof o.format !== "string" ? o.format : [o.format];
            self2._html5 = o.html5 || false;
            self2._muted = o.mute || false;
            self2._loop = o.loop || false;
            self2._pool = o.pool || 5;
            self2._preload = typeof o.preload === "boolean" || o.preload === "metadata" ? o.preload : true;
            self2._rate = o.rate || 1;
            self2._sprite = o.sprite || {};
            self2._src = typeof o.src !== "string" ? o.src : [o.src];
            self2._volume = o.volume !== void 0 ? o.volume : 1;
            self2._xhr = {
              method: o.xhr && o.xhr.method ? o.xhr.method : "GET",
              headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
              withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false
            };
            self2._duration = 0;
            self2._state = "unloaded";
            self2._sounds = [];
            self2._endTimers = {};
            self2._queue = [];
            self2._playLock = false;
            self2._onend = o.onend ? [{ fn: o.onend }] : [];
            self2._onfade = o.onfade ? [{ fn: o.onfade }] : [];
            self2._onload = o.onload ? [{ fn: o.onload }] : [];
            self2._onloaderror = o.onloaderror ? [{ fn: o.onloaderror }] : [];
            self2._onplayerror = o.onplayerror ? [{ fn: o.onplayerror }] : [];
            self2._onpause = o.onpause ? [{ fn: o.onpause }] : [];
            self2._onplay = o.onplay ? [{ fn: o.onplay }] : [];
            self2._onstop = o.onstop ? [{ fn: o.onstop }] : [];
            self2._onmute = o.onmute ? [{ fn: o.onmute }] : [];
            self2._onvolume = o.onvolume ? [{ fn: o.onvolume }] : [];
            self2._onrate = o.onrate ? [{ fn: o.onrate }] : [];
            self2._onseek = o.onseek ? [{ fn: o.onseek }] : [];
            self2._onunlock = o.onunlock ? [{ fn: o.onunlock }] : [];
            self2._onresume = [];
            self2._webAudio = Howler.usingWebAudio && !self2._html5;
            if (typeof Howler.ctx !== "undefined" && Howler.ctx && Howler.autoUnlock) {
              Howler._unlockAudio();
            }
            Howler._howls.push(self2);
            if (self2._autoplay) {
              self2._queue.push({
                event: "play",
                action: function() {
                  self2.play();
                }
              });
            }
            if (self2._preload && self2._preload !== "none") {
              self2.load();
            }
            return self2;
          },
          /**
           * Load the audio file.
           * @return {Howler}
           */
          load: function() {
            var self2 = this;
            var url = null;
            if (Howler.noAudio) {
              self2._emit("loaderror", null, "No audio support.");
              return;
            }
            if (typeof self2._src === "string") {
              self2._src = [self2._src];
            }
            for (var i = 0; i < self2._src.length; i++) {
              var ext, str;
              if (self2._format && self2._format[i]) {
                ext = self2._format[i];
              } else {
                str = self2._src[i];
                if (typeof str !== "string") {
                  self2._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                  continue;
                }
                ext = /^data:audio\/([^;,]+);/i.exec(str);
                if (!ext) {
                  ext = /\.([^.]+)$/.exec(str.split("?", 1)[0]);
                }
                if (ext) {
                  ext = ext[1].toLowerCase();
                }
              }
              if (!ext) {
                console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
              }
              if (ext && Howler.codecs(ext)) {
                url = self2._src[i];
                break;
              }
            }
            if (!url) {
              self2._emit("loaderror", null, "No codec support for selected audio sources.");
              return;
            }
            self2._src = url;
            self2._state = "loading";
            if (window.location.protocol === "https:" && url.slice(0, 5) === "http:") {
              self2._html5 = true;
              self2._webAudio = false;
            }
            new Sound2(self2);
            if (self2._webAudio) {
              loadBuffer(self2);
            }
            return self2;
          },
          /**
           * Play a sound or resume previous playback.
           * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
           * @param  {Boolean} internal Internal Use: true prevents event firing.
           * @return {Number}          Sound ID.
           */
          play: function(sprite, internal) {
            var self2 = this;
            var id = null;
            if (typeof sprite === "number") {
              id = sprite;
              sprite = null;
            } else if (typeof sprite === "string" && self2._state === "loaded" && !self2._sprite[sprite]) {
              return null;
            } else if (typeof sprite === "undefined") {
              sprite = "__default";
              if (!self2._playLock) {
                var num = 0;
                for (var i = 0; i < self2._sounds.length; i++) {
                  if (self2._sounds[i]._paused && !self2._sounds[i]._ended) {
                    num++;
                    id = self2._sounds[i]._id;
                  }
                }
                if (num === 1) {
                  sprite = null;
                } else {
                  id = null;
                }
              }
            }
            var sound = id ? self2._soundById(id) : self2._inactiveSound();
            if (!sound) {
              return null;
            }
            if (id && !sprite) {
              sprite = sound._sprite || "__default";
            }
            if (self2._state !== "loaded") {
              sound._sprite = sprite;
              sound._ended = false;
              var soundId = sound._id;
              self2._queue.push({
                event: "play",
                action: function() {
                  self2.play(soundId);
                }
              });
              return soundId;
            }
            if (id && !sound._paused) {
              if (!internal) {
                self2._loadQueue("play");
              }
              return sound._id;
            }
            if (self2._webAudio) {
              Howler._autoResume();
            }
            var seek = Math.max(0, sound._seek > 0 ? sound._seek : self2._sprite[sprite][0] / 1e3);
            var duration = Math.max(0, (self2._sprite[sprite][0] + self2._sprite[sprite][1]) / 1e3 - seek);
            var timeout = duration * 1e3 / Math.abs(sound._rate);
            var start = self2._sprite[sprite][0] / 1e3;
            var stop = (self2._sprite[sprite][0] + self2._sprite[sprite][1]) / 1e3;
            sound._sprite = sprite;
            sound._ended = false;
            var setParams = function() {
              sound._paused = false;
              sound._seek = seek;
              sound._start = start;
              sound._stop = stop;
              sound._loop = !!(sound._loop || self2._sprite[sprite][2]);
            };
            if (seek >= stop) {
              self2._ended(sound);
              return;
            }
            var node = sound._node;
            if (self2._webAudio) {
              var playWebAudio = function() {
                self2._playLock = false;
                setParams();
                self2._refreshBuffer(sound);
                var vol = sound._muted || self2._muted ? 0 : sound._volume;
                node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
                sound._playStart = Howler.ctx.currentTime;
                if (typeof node.bufferSource.start === "undefined") {
                  sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
                } else {
                  sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
                }
                if (timeout !== Infinity) {
                  self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout);
                }
                if (!internal) {
                  setTimeout(function() {
                    self2._emit("play", sound._id);
                    self2._loadQueue();
                  }, 0);
                }
              };
              if (Howler.state === "running" && Howler.ctx.state !== "interrupted") {
                playWebAudio();
              } else {
                self2._playLock = true;
                self2.once("resume", playWebAudio);
                self2._clearTimer(sound._id);
              }
            } else {
              var playHtml5 = function() {
                node.currentTime = seek;
                node.muted = sound._muted || self2._muted || Howler._muted || node.muted;
                node.volume = sound._volume * Howler.volume();
                node.playbackRate = sound._rate;
                try {
                  var play = node.play();
                  if (play && typeof Promise !== "undefined" && (play instanceof Promise || typeof play.then === "function")) {
                    self2._playLock = true;
                    setParams();
                    play.then(function() {
                      self2._playLock = false;
                      node._unlocked = true;
                      if (!internal) {
                        self2._emit("play", sound._id);
                      } else {
                        self2._loadQueue();
                      }
                    }).catch(function() {
                      self2._playLock = false;
                      self2._emit("playerror", sound._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                      sound._ended = true;
                      sound._paused = true;
                    });
                  } else if (!internal) {
                    self2._playLock = false;
                    setParams();
                    self2._emit("play", sound._id);
                  }
                  node.playbackRate = sound._rate;
                  if (node.paused) {
                    self2._emit("playerror", sound._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                    return;
                  }
                  if (sprite !== "__default" || sound._loop) {
                    self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout);
                  } else {
                    self2._endTimers[sound._id] = function() {
                      self2._ended(sound);
                      node.removeEventListener("ended", self2._endTimers[sound._id], false);
                    };
                    node.addEventListener("ended", self2._endTimers[sound._id], false);
                  }
                } catch (err) {
                  self2._emit("playerror", sound._id, err);
                }
              };
              if (node.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA") {
                node.src = self2._src;
                node.load();
              }
              var loadedNoReadyState = window && window.ejecta || !node.readyState && Howler._navigator.isCocoonJS;
              if (node.readyState >= 3 || loadedNoReadyState) {
                playHtml5();
              } else {
                self2._playLock = true;
                self2._state = "loading";
                var listener = function() {
                  self2._state = "loaded";
                  playHtml5();
                  node.removeEventListener(Howler._canPlayEvent, listener, false);
                };
                node.addEventListener(Howler._canPlayEvent, listener, false);
                self2._clearTimer(sound._id);
              }
            }
            return sound._id;
          },
          /**
           * Pause playback and save current position.
           * @param  {Number} id The sound ID (empty to pause all in group).
           * @return {Howl}
           */
          pause: function(id) {
            var self2 = this;
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "pause",
                action: function() {
                  self2.pause(id);
                }
              });
              return self2;
            }
            var ids = self2._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              self2._clearTimer(ids[i]);
              var sound = self2._soundById(ids[i]);
              if (sound && !sound._paused) {
                sound._seek = self2.seek(ids[i]);
                sound._rateSeek = 0;
                sound._paused = true;
                self2._stopFade(ids[i]);
                if (sound._node) {
                  if (self2._webAudio) {
                    if (!sound._node.bufferSource) {
                      continue;
                    }
                    if (typeof sound._node.bufferSource.stop === "undefined") {
                      sound._node.bufferSource.noteOff(0);
                    } else {
                      sound._node.bufferSource.stop(0);
                    }
                    self2._cleanBuffer(sound._node);
                  } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
                    sound._node.pause();
                  }
                }
              }
              if (!arguments[1]) {
                self2._emit("pause", sound ? sound._id : null);
              }
            }
            return self2;
          },
          /**
           * Stop playback and reset to start.
           * @param  {Number} id The sound ID (empty to stop all in group).
           * @param  {Boolean} internal Internal Use: true prevents event firing.
           * @return {Howl}
           */
          stop: function(id, internal) {
            var self2 = this;
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "stop",
                action: function() {
                  self2.stop(id);
                }
              });
              return self2;
            }
            var ids = self2._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              self2._clearTimer(ids[i]);
              var sound = self2._soundById(ids[i]);
              if (sound) {
                sound._seek = sound._start || 0;
                sound._rateSeek = 0;
                sound._paused = true;
                sound._ended = true;
                self2._stopFade(ids[i]);
                if (sound._node) {
                  if (self2._webAudio) {
                    if (sound._node.bufferSource) {
                      if (typeof sound._node.bufferSource.stop === "undefined") {
                        sound._node.bufferSource.noteOff(0);
                      } else {
                        sound._node.bufferSource.stop(0);
                      }
                      self2._cleanBuffer(sound._node);
                    }
                  } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
                    sound._node.currentTime = sound._start || 0;
                    sound._node.pause();
                    if (sound._node.duration === Infinity) {
                      self2._clearSound(sound._node);
                    }
                  }
                }
                if (!internal) {
                  self2._emit("stop", sound._id);
                }
              }
            }
            return self2;
          },
          /**
           * Mute/unmute a single sound or all sounds in this Howl group.
           * @param  {Boolean} muted Set to true to mute and false to unmute.
           * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
           * @return {Howl}
           */
          mute: function(muted, id) {
            var self2 = this;
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "mute",
                action: function() {
                  self2.mute(muted, id);
                }
              });
              return self2;
            }
            if (typeof id === "undefined") {
              if (typeof muted === "boolean") {
                self2._muted = muted;
              } else {
                return self2._muted;
              }
            }
            var ids = self2._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              var sound = self2._soundById(ids[i]);
              if (sound) {
                sound._muted = muted;
                if (sound._interval) {
                  self2._stopFade(sound._id);
                }
                if (self2._webAudio && sound._node) {
                  sound._node.gain.setValueAtTime(muted ? 0 : sound._volume, Howler.ctx.currentTime);
                } else if (sound._node) {
                  sound._node.muted = Howler._muted ? true : muted;
                }
                self2._emit("mute", sound._id);
              }
            }
            return self2;
          },
          /**
           * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
           *   volume() -> Returns the group's volume value.
           *   volume(id) -> Returns the sound id's current volume.
           *   volume(vol) -> Sets the volume of all sounds in this Howl group.
           *   volume(vol, id) -> Sets the volume of passed sound id.
           * @return {Howl/Number} Returns self or current volume.
           */
          volume: function() {
            var self2 = this;
            var args = arguments;
            var vol, id;
            if (args.length === 0) {
              return self2._volume;
            } else if (args.length === 1 || args.length === 2 && typeof args[1] === "undefined") {
              var ids = self2._getSoundIds();
              var index4 = ids.indexOf(args[0]);
              if (index4 >= 0) {
                id = parseInt(args[0], 10);
              } else {
                vol = parseFloat(args[0]);
              }
            } else if (args.length >= 2) {
              vol = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            var sound;
            if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
              if (self2._state !== "loaded" || self2._playLock) {
                self2._queue.push({
                  event: "volume",
                  action: function() {
                    self2.volume.apply(self2, args);
                  }
                });
                return self2;
              }
              if (typeof id === "undefined") {
                self2._volume = vol;
              }
              id = self2._getSoundIds(id);
              for (var i = 0; i < id.length; i++) {
                sound = self2._soundById(id[i]);
                if (sound) {
                  sound._volume = vol;
                  if (!args[2]) {
                    self2._stopFade(id[i]);
                  }
                  if (self2._webAudio && sound._node && !sound._muted) {
                    sound._node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
                  } else if (sound._node && !sound._muted) {
                    sound._node.volume = vol * Howler.volume();
                  }
                  self2._emit("volume", sound._id);
                }
              }
            } else {
              sound = id ? self2._soundById(id) : self2._sounds[0];
              return sound ? sound._volume : 0;
            }
            return self2;
          },
          /**
           * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
           * @param  {Number} from The value to fade from (0.0 to 1.0).
           * @param  {Number} to   The volume to fade to (0.0 to 1.0).
           * @param  {Number} len  Time in milliseconds to fade.
           * @param  {Number} id   The sound id (omit to fade all sounds).
           * @return {Howl}
           */
          fade: function(from, to, len, id) {
            var self2 = this;
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "fade",
                action: function() {
                  self2.fade(from, to, len, id);
                }
              });
              return self2;
            }
            from = Math.min(Math.max(0, parseFloat(from)), 1);
            to = Math.min(Math.max(0, parseFloat(to)), 1);
            len = parseFloat(len);
            self2.volume(from, id);
            var ids = self2._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              var sound = self2._soundById(ids[i]);
              if (sound) {
                if (!id) {
                  self2._stopFade(ids[i]);
                }
                if (self2._webAudio && !sound._muted) {
                  var currentTime = Howler.ctx.currentTime;
                  var end = currentTime + len / 1e3;
                  sound._volume = from;
                  sound._node.gain.setValueAtTime(from, currentTime);
                  sound._node.gain.linearRampToValueAtTime(to, end);
                }
                self2._startFadeInterval(sound, from, to, len, ids[i], typeof id === "undefined");
              }
            }
            return self2;
          },
          /**
           * Starts the internal interval to fade a sound.
           * @param  {Object} sound Reference to sound to fade.
           * @param  {Number} from The value to fade from (0.0 to 1.0).
           * @param  {Number} to   The volume to fade to (0.0 to 1.0).
           * @param  {Number} len  Time in milliseconds to fade.
           * @param  {Number} id   The sound id to fade.
           * @param  {Boolean} isGroup   If true, set the volume on the group.
           */
          _startFadeInterval: function(sound, from, to, len, id, isGroup) {
            var self2 = this;
            var vol = from;
            var diff = to - from;
            var steps = Math.abs(diff / 0.01);
            var stepLen = Math.max(4, steps > 0 ? len / steps : len);
            var lastTick = Date.now();
            sound._fadeTo = to;
            sound._interval = setInterval(function() {
              var tick = (Date.now() - lastTick) / len;
              lastTick = Date.now();
              vol += diff * tick;
              vol = Math.round(vol * 100) / 100;
              if (diff < 0) {
                vol = Math.max(to, vol);
              } else {
                vol = Math.min(to, vol);
              }
              if (self2._webAudio) {
                sound._volume = vol;
              } else {
                self2.volume(vol, sound._id, true);
              }
              if (isGroup) {
                self2._volume = vol;
              }
              if (to < from && vol <= to || to > from && vol >= to) {
                clearInterval(sound._interval);
                sound._interval = null;
                sound._fadeTo = null;
                self2.volume(to, sound._id);
                self2._emit("fade", sound._id);
              }
            }, stepLen);
          },
          /**
           * Internal method that stops the currently playing fade when
           * a new fade starts, volume is changed or the sound is stopped.
           * @param  {Number} id The sound id.
           * @return {Howl}
           */
          _stopFade: function(id) {
            var self2 = this;
            var sound = self2._soundById(id);
            if (sound && sound._interval) {
              if (self2._webAudio) {
                sound._node.gain.cancelScheduledValues(Howler.ctx.currentTime);
              }
              clearInterval(sound._interval);
              sound._interval = null;
              self2.volume(sound._fadeTo, id);
              sound._fadeTo = null;
              self2._emit("fade", id);
            }
            return self2;
          },
          /**
           * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
           *   loop() -> Returns the group's loop value.
           *   loop(id) -> Returns the sound id's loop value.
           *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
           *   loop(loop, id) -> Sets the loop value of passed sound id.
           * @return {Howl/Boolean} Returns self or current loop value.
           */
          loop: function() {
            var self2 = this;
            var args = arguments;
            var loop, id, sound;
            if (args.length === 0) {
              return self2._loop;
            } else if (args.length === 1) {
              if (typeof args[0] === "boolean") {
                loop = args[0];
                self2._loop = loop;
              } else {
                sound = self2._soundById(parseInt(args[0], 10));
                return sound ? sound._loop : false;
              }
            } else if (args.length === 2) {
              loop = args[0];
              id = parseInt(args[1], 10);
            }
            var ids = self2._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              sound = self2._soundById(ids[i]);
              if (sound) {
                sound._loop = loop;
                if (self2._webAudio && sound._node && sound._node.bufferSource) {
                  sound._node.bufferSource.loop = loop;
                  if (loop) {
                    sound._node.bufferSource.loopStart = sound._start || 0;
                    sound._node.bufferSource.loopEnd = sound._stop;
                    if (self2.playing(ids[i])) {
                      self2.pause(ids[i], true);
                      self2.play(ids[i], true);
                    }
                  }
                }
              }
            }
            return self2;
          },
          /**
           * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
           *   rate() -> Returns the first sound node's current playback rate.
           *   rate(id) -> Returns the sound id's current playback rate.
           *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
           *   rate(rate, id) -> Sets the playback rate of passed sound id.
           * @return {Howl/Number} Returns self or the current playback rate.
           */
          rate: function() {
            var self2 = this;
            var args = arguments;
            var rate, id;
            if (args.length === 0) {
              id = self2._sounds[0]._id;
            } else if (args.length === 1) {
              var ids = self2._getSoundIds();
              var index4 = ids.indexOf(args[0]);
              if (index4 >= 0) {
                id = parseInt(args[0], 10);
              } else {
                rate = parseFloat(args[0]);
              }
            } else if (args.length === 2) {
              rate = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            var sound;
            if (typeof rate === "number") {
              if (self2._state !== "loaded" || self2._playLock) {
                self2._queue.push({
                  event: "rate",
                  action: function() {
                    self2.rate.apply(self2, args);
                  }
                });
                return self2;
              }
              if (typeof id === "undefined") {
                self2._rate = rate;
              }
              id = self2._getSoundIds(id);
              for (var i = 0; i < id.length; i++) {
                sound = self2._soundById(id[i]);
                if (sound) {
                  if (self2.playing(id[i])) {
                    sound._rateSeek = self2.seek(id[i]);
                    sound._playStart = self2._webAudio ? Howler.ctx.currentTime : sound._playStart;
                  }
                  sound._rate = rate;
                  if (self2._webAudio && sound._node && sound._node.bufferSource) {
                    sound._node.bufferSource.playbackRate.setValueAtTime(rate, Howler.ctx.currentTime);
                  } else if (sound._node) {
                    sound._node.playbackRate = rate;
                  }
                  var seek = self2.seek(id[i]);
                  var duration = (self2._sprite[sound._sprite][0] + self2._sprite[sound._sprite][1]) / 1e3 - seek;
                  var timeout = duration * 1e3 / Math.abs(sound._rate);
                  if (self2._endTimers[id[i]] || !sound._paused) {
                    self2._clearTimer(id[i]);
                    self2._endTimers[id[i]] = setTimeout(self2._ended.bind(self2, sound), timeout);
                  }
                  self2._emit("rate", sound._id);
                }
              }
            } else {
              sound = self2._soundById(id);
              return sound ? sound._rate : self2._rate;
            }
            return self2;
          },
          /**
           * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
           *   seek() -> Returns the first sound node's current seek position.
           *   seek(id) -> Returns the sound id's current seek position.
           *   seek(seek) -> Sets the seek position of the first sound node.
           *   seek(seek, id) -> Sets the seek position of passed sound id.
           * @return {Howl/Number} Returns self or the current seek position.
           */
          seek: function() {
            var self2 = this;
            var args = arguments;
            var seek, id;
            if (args.length === 0) {
              if (self2._sounds.length) {
                id = self2._sounds[0]._id;
              }
            } else if (args.length === 1) {
              var ids = self2._getSoundIds();
              var index4 = ids.indexOf(args[0]);
              if (index4 >= 0) {
                id = parseInt(args[0], 10);
              } else if (self2._sounds.length) {
                id = self2._sounds[0]._id;
                seek = parseFloat(args[0]);
              }
            } else if (args.length === 2) {
              seek = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            if (typeof id === "undefined") {
              return 0;
            }
            if (typeof seek === "number" && (self2._state !== "loaded" || self2._playLock)) {
              self2._queue.push({
                event: "seek",
                action: function() {
                  self2.seek.apply(self2, args);
                }
              });
              return self2;
            }
            var sound = self2._soundById(id);
            if (sound) {
              if (typeof seek === "number" && seek >= 0) {
                var playing = self2.playing(id);
                if (playing) {
                  self2.pause(id, true);
                }
                sound._seek = seek;
                sound._ended = false;
                self2._clearTimer(id);
                if (!self2._webAudio && sound._node && !isNaN(sound._node.duration)) {
                  sound._node.currentTime = seek;
                }
                var seekAndEmit = function() {
                  if (playing) {
                    self2.play(id, true);
                  }
                  self2._emit("seek", id);
                };
                if (playing && !self2._webAudio) {
                  var emitSeek = function() {
                    if (!self2._playLock) {
                      seekAndEmit();
                    } else {
                      setTimeout(emitSeek, 0);
                    }
                  };
                  setTimeout(emitSeek, 0);
                } else {
                  seekAndEmit();
                }
              } else {
                if (self2._webAudio) {
                  var realTime = self2.playing(id) ? Howler.ctx.currentTime - sound._playStart : 0;
                  var rateSeek = sound._rateSeek ? sound._rateSeek - sound._seek : 0;
                  return sound._seek + (rateSeek + realTime * Math.abs(sound._rate));
                } else {
                  return sound._node.currentTime;
                }
              }
            }
            return self2;
          },
          /**
           * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
           * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
           * @return {Boolean} True if playing and false if not.
           */
          playing: function(id) {
            var self2 = this;
            if (typeof id === "number") {
              var sound = self2._soundById(id);
              return sound ? !sound._paused : false;
            }
            for (var i = 0; i < self2._sounds.length; i++) {
              if (!self2._sounds[i]._paused) {
                return true;
              }
            }
            return false;
          },
          /**
           * Get the duration of this sound. Passing a sound id will return the sprite duration.
           * @param  {Number} id The sound id to check. If none is passed, return full source duration.
           * @return {Number} Audio duration in seconds.
           */
          duration: function(id) {
            var self2 = this;
            var duration = self2._duration;
            var sound = self2._soundById(id);
            if (sound) {
              duration = self2._sprite[sound._sprite][1] / 1e3;
            }
            return duration;
          },
          /**
           * Returns the current loaded state of this Howl.
           * @return {String} 'unloaded', 'loading', 'loaded'
           */
          state: function() {
            return this._state;
          },
          /**
           * Unload and destroy the current Howl object.
           * This will immediately stop all sound instances attached to this group.
           */
          unload: function() {
            var self2 = this;
            var sounds = self2._sounds;
            for (var i = 0; i < sounds.length; i++) {
              if (!sounds[i]._paused) {
                self2.stop(sounds[i]._id);
              }
              if (!self2._webAudio) {
                self2._clearSound(sounds[i]._node);
                sounds[i]._node.removeEventListener("error", sounds[i]._errorFn, false);
                sounds[i]._node.removeEventListener(Howler._canPlayEvent, sounds[i]._loadFn, false);
                sounds[i]._node.removeEventListener("ended", sounds[i]._endFn, false);
                Howler._releaseHtml5Audio(sounds[i]._node);
              }
              delete sounds[i]._node;
              self2._clearTimer(sounds[i]._id);
            }
            var index4 = Howler._howls.indexOf(self2);
            if (index4 >= 0) {
              Howler._howls.splice(index4, 1);
            }
            var remCache = true;
            for (i = 0; i < Howler._howls.length; i++) {
              if (Howler._howls[i]._src === self2._src || self2._src.indexOf(Howler._howls[i]._src) >= 0) {
                remCache = false;
                break;
              }
            }
            if (cache && remCache) {
              delete cache[self2._src];
            }
            Howler.noAudio = false;
            self2._state = "unloaded";
            self2._sounds = [];
            self2 = null;
            return null;
          },
          /**
           * Listen to a custom event.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to call.
           * @param  {Number}   id    (optional) Only listen to events for this sound.
           * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
           * @return {Howl}
           */
          on: function(event, fn, id, once2) {
            var self2 = this;
            var events = self2["_on" + event];
            if (typeof fn === "function") {
              events.push(once2 ? { id, fn, once: once2 } : { id, fn });
            }
            return self2;
          },
          /**
           * Remove a custom event. Call without parameters to remove all events.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to remove. Leave empty to remove all.
           * @param  {Number}   id    (optional) Only remove events for this sound.
           * @return {Howl}
           */
          off: function(event, fn, id) {
            var self2 = this;
            var events = self2["_on" + event];
            var i = 0;
            if (typeof fn === "number") {
              id = fn;
              fn = null;
            }
            if (fn || id) {
              for (i = 0; i < events.length; i++) {
                var isId = id === events[i].id;
                if (fn === events[i].fn && isId || !fn && isId) {
                  events.splice(i, 1);
                  break;
                }
              }
            } else if (event) {
              self2["_on" + event] = [];
            } else {
              var keys = Object.keys(self2);
              for (i = 0; i < keys.length; i++) {
                if (keys[i].indexOf("_on") === 0 && Array.isArray(self2[keys[i]])) {
                  self2[keys[i]] = [];
                }
              }
            }
            return self2;
          },
          /**
           * Listen to a custom event and remove it once fired.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to call.
           * @param  {Number}   id    (optional) Only listen to events for this sound.
           * @return {Howl}
           */
          once: function(event, fn, id) {
            var self2 = this;
            self2.on(event, fn, id, 1);
            return self2;
          },
          /**
           * Emit all events of a specific type and pass the sound id.
           * @param  {String} event Event name.
           * @param  {Number} id    Sound ID.
           * @param  {Number} msg   Message to go with event.
           * @return {Howl}
           */
          _emit: function(event, id, msg) {
            var self2 = this;
            var events = self2["_on" + event];
            for (var i = events.length - 1; i >= 0; i--) {
              if (!events[i].id || events[i].id === id || event === "load") {
                setTimeout(function(fn) {
                  fn.call(this, id, msg);
                }.bind(self2, events[i].fn), 0);
                if (events[i].once) {
                  self2.off(event, events[i].fn, events[i].id);
                }
              }
            }
            self2._loadQueue(event);
            return self2;
          },
          /**
           * Queue of actions initiated before the sound has loaded.
           * These will be called in sequence, with the next only firing
           * after the previous has finished executing (even if async like play).
           * @return {Howl}
           */
          _loadQueue: function(event) {
            var self2 = this;
            if (self2._queue.length > 0) {
              var task = self2._queue[0];
              if (task.event === event) {
                self2._queue.shift();
                self2._loadQueue();
              }
              if (!event) {
                task.action();
              }
            }
            return self2;
          },
          /**
           * Fired when playback ends at the end of the duration.
           * @param  {Sound} sound The sound object to work with.
           * @return {Howl}
           */
          _ended: function(sound) {
            var self2 = this;
            var sprite = sound._sprite;
            if (!self2._webAudio && sound._node && !sound._node.paused && !sound._node.ended && sound._node.currentTime < sound._stop) {
              setTimeout(self2._ended.bind(self2, sound), 100);
              return self2;
            }
            var loop = !!(sound._loop || self2._sprite[sprite][2]);
            self2._emit("end", sound._id);
            if (!self2._webAudio && loop) {
              self2.stop(sound._id, true).play(sound._id);
            }
            if (self2._webAudio && loop) {
              self2._emit("play", sound._id);
              sound._seek = sound._start || 0;
              sound._rateSeek = 0;
              sound._playStart = Howler.ctx.currentTime;
              var timeout = (sound._stop - sound._start) * 1e3 / Math.abs(sound._rate);
              self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout);
            }
            if (self2._webAudio && !loop) {
              sound._paused = true;
              sound._ended = true;
              sound._seek = sound._start || 0;
              sound._rateSeek = 0;
              self2._clearTimer(sound._id);
              self2._cleanBuffer(sound._node);
              Howler._autoSuspend();
            }
            if (!self2._webAudio && !loop) {
              self2.stop(sound._id, true);
            }
            return self2;
          },
          /**
           * Clear the end timer for a sound playback.
           * @param  {Number} id The sound ID.
           * @return {Howl}
           */
          _clearTimer: function(id) {
            var self2 = this;
            if (self2._endTimers[id]) {
              if (typeof self2._endTimers[id] !== "function") {
                clearTimeout(self2._endTimers[id]);
              } else {
                var sound = self2._soundById(id);
                if (sound && sound._node) {
                  sound._node.removeEventListener("ended", self2._endTimers[id], false);
                }
              }
              delete self2._endTimers[id];
            }
            return self2;
          },
          /**
           * Return the sound identified by this ID, or return null.
           * @param  {Number} id Sound ID
           * @return {Object}    Sound object or null.
           */
          _soundById: function(id) {
            var self2 = this;
            for (var i = 0; i < self2._sounds.length; i++) {
              if (id === self2._sounds[i]._id) {
                return self2._sounds[i];
              }
            }
            return null;
          },
          /**
           * Return an inactive sound from the pool or create a new one.
           * @return {Sound} Sound playback object.
           */
          _inactiveSound: function() {
            var self2 = this;
            self2._drain();
            for (var i = 0; i < self2._sounds.length; i++) {
              if (self2._sounds[i]._ended) {
                return self2._sounds[i].reset();
              }
            }
            return new Sound2(self2);
          },
          /**
           * Drain excess inactive sounds from the pool.
           */
          _drain: function() {
            var self2 = this;
            var limit = self2._pool;
            var cnt = 0;
            var i = 0;
            if (self2._sounds.length < limit) {
              return;
            }
            for (i = 0; i < self2._sounds.length; i++) {
              if (self2._sounds[i]._ended) {
                cnt++;
              }
            }
            for (i = self2._sounds.length - 1; i >= 0; i--) {
              if (cnt <= limit) {
                return;
              }
              if (self2._sounds[i]._ended) {
                if (self2._webAudio && self2._sounds[i]._node) {
                  self2._sounds[i]._node.disconnect(0);
                }
                self2._sounds.splice(i, 1);
                cnt--;
              }
            }
          },
          /**
           * Get all ID's from the sounds pool.
           * @param  {Number} id Only return one ID if one is passed.
           * @return {Array}    Array of IDs.
           */
          _getSoundIds: function(id) {
            var self2 = this;
            if (typeof id === "undefined") {
              var ids = [];
              for (var i = 0; i < self2._sounds.length; i++) {
                ids.push(self2._sounds[i]._id);
              }
              return ids;
            } else {
              return [id];
            }
          },
          /**
           * Load the sound back into the buffer source.
           * @param  {Sound} sound The sound object to work with.
           * @return {Howl}
           */
          _refreshBuffer: function(sound) {
            var self2 = this;
            sound._node.bufferSource = Howler.ctx.createBufferSource();
            sound._node.bufferSource.buffer = cache[self2._src];
            if (sound._panner) {
              sound._node.bufferSource.connect(sound._panner);
            } else {
              sound._node.bufferSource.connect(sound._node);
            }
            sound._node.bufferSource.loop = sound._loop;
            if (sound._loop) {
              sound._node.bufferSource.loopStart = sound._start || 0;
              sound._node.bufferSource.loopEnd = sound._stop || 0;
            }
            sound._node.bufferSource.playbackRate.setValueAtTime(sound._rate, Howler.ctx.currentTime);
            return self2;
          },
          /**
           * Prevent memory leaks by cleaning up the buffer source after playback.
           * @param  {Object} node Sound's audio node containing the buffer source.
           * @return {Howl}
           */
          _cleanBuffer: function(node) {
            var self2 = this;
            var isIOS = Howler._navigator && Howler._navigator.vendor.indexOf("Apple") >= 0;
            if (Howler._scratchBuffer && node.bufferSource) {
              node.bufferSource.onended = null;
              node.bufferSource.disconnect(0);
              if (isIOS) {
                try {
                  node.bufferSource.buffer = Howler._scratchBuffer;
                } catch (e) {
                }
              }
            }
            node.bufferSource = null;
            return self2;
          },
          /**
           * Set the source to a 0-second silence to stop any downloading (except in IE).
           * @param  {Object} node Audio node to clear.
           */
          _clearSound: function(node) {
            var checkIE = /MSIE |Trident\//.test(Howler._navigator && Howler._navigator.userAgent);
            if (!checkIE) {
              node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            }
          }
        };
        var Sound2 = function(howl) {
          this._parent = howl;
          this.init();
        };
        Sound2.prototype = {
          /**
           * Initialize a new Sound object.
           * @return {Sound}
           */
          init: function() {
            var self2 = this;
            var parent = self2._parent;
            self2._muted = parent._muted;
            self2._loop = parent._loop;
            self2._volume = parent._volume;
            self2._rate = parent._rate;
            self2._seek = 0;
            self2._paused = true;
            self2._ended = true;
            self2._sprite = "__default";
            self2._id = ++Howler._counter;
            parent._sounds.push(self2);
            self2.create();
            return self2;
          },
          /**
           * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
           * @return {Sound}
           */
          create: function() {
            var self2 = this;
            var parent = self2._parent;
            var volume = Howler._muted || self2._muted || self2._parent._muted ? 0 : self2._volume;
            if (parent._webAudio) {
              self2._node = typeof Howler.ctx.createGain === "undefined" ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
              self2._node.gain.setValueAtTime(volume, Howler.ctx.currentTime);
              self2._node.paused = true;
              self2._node.connect(Howler.masterGain);
            } else if (!Howler.noAudio) {
              self2._node = Howler._obtainHtml5Audio();
              self2._errorFn = self2._errorListener.bind(self2);
              self2._node.addEventListener("error", self2._errorFn, false);
              self2._loadFn = self2._loadListener.bind(self2);
              self2._node.addEventListener(Howler._canPlayEvent, self2._loadFn, false);
              self2._endFn = self2._endListener.bind(self2);
              self2._node.addEventListener("ended", self2._endFn, false);
              self2._node.src = parent._src;
              self2._node.preload = parent._preload === true ? "auto" : parent._preload;
              self2._node.volume = volume * Howler.volume();
              self2._node.load();
            }
            return self2;
          },
          /**
           * Reset the parameters of this sound to the original state (for recycle).
           * @return {Sound}
           */
          reset: function() {
            var self2 = this;
            var parent = self2._parent;
            self2._muted = parent._muted;
            self2._loop = parent._loop;
            self2._volume = parent._volume;
            self2._rate = parent._rate;
            self2._seek = 0;
            self2._rateSeek = 0;
            self2._paused = true;
            self2._ended = true;
            self2._sprite = "__default";
            self2._id = ++Howler._counter;
            return self2;
          },
          /**
           * HTML5 Audio error listener callback.
           */
          _errorListener: function() {
            var self2 = this;
            self2._parent._emit("loaderror", self2._id, self2._node.error ? self2._node.error.code : 0);
            self2._node.removeEventListener("error", self2._errorFn, false);
          },
          /**
           * HTML5 Audio canplaythrough listener callback.
           */
          _loadListener: function() {
            var self2 = this;
            var parent = self2._parent;
            parent._duration = Math.ceil(self2._node.duration * 10) / 10;
            if (Object.keys(parent._sprite).length === 0) {
              parent._sprite = { __default: [0, parent._duration * 1e3] };
            }
            if (parent._state !== "loaded") {
              parent._state = "loaded";
              parent._emit("load");
              parent._loadQueue();
            }
            self2._node.removeEventListener(Howler._canPlayEvent, self2._loadFn, false);
          },
          /**
           * HTML5 Audio ended listener callback.
           */
          _endListener: function() {
            var self2 = this;
            var parent = self2._parent;
            if (parent._duration === Infinity) {
              parent._duration = Math.ceil(self2._node.duration * 10) / 10;
              if (parent._sprite.__default[1] === Infinity) {
                parent._sprite.__default[1] = parent._duration * 1e3;
              }
              parent._ended(self2);
            }
            self2._node.removeEventListener("ended", self2._endFn, false);
          }
        };
        var cache = {};
        var loadBuffer = function(self2) {
          var url = self2._src;
          if (cache[url]) {
            self2._duration = cache[url].duration;
            loadSound(self2);
            return;
          }
          if (/^data:[^;]+;base64,/.test(url)) {
            var data = atob(url.split(",")[1]);
            var dataView = new Uint8Array(data.length);
            for (var i = 0; i < data.length; ++i) {
              dataView[i] = data.charCodeAt(i);
            }
            decodeAudioData(dataView.buffer, self2);
          } else {
            var xhr = new XMLHttpRequest();
            xhr.open(self2._xhr.method, url, true);
            xhr.withCredentials = self2._xhr.withCredentials;
            xhr.responseType = "arraybuffer";
            if (self2._xhr.headers) {
              Object.keys(self2._xhr.headers).forEach(function(key2) {
                xhr.setRequestHeader(key2, self2._xhr.headers[key2]);
              });
            }
            xhr.onload = function() {
              var code = (xhr.status + "")[0];
              if (code !== "0" && code !== "2" && code !== "3") {
                self2._emit("loaderror", null, "Failed loading audio file with status: " + xhr.status + ".");
                return;
              }
              decodeAudioData(xhr.response, self2);
            };
            xhr.onerror = function() {
              if (self2._webAudio) {
                self2._html5 = true;
                self2._webAudio = false;
                self2._sounds = [];
                delete cache[url];
                self2.load();
              }
            };
            safeXhrSend(xhr);
          }
        };
        var safeXhrSend = function(xhr) {
          try {
            xhr.send();
          } catch (e) {
            xhr.onerror();
          }
        };
        var decodeAudioData = function(arraybuffer, self2) {
          var error2 = function() {
            self2._emit("loaderror", null, "Decoding audio data failed.");
          };
          var success = function(buffer) {
            if (buffer && self2._sounds.length > 0) {
              cache[self2._src] = buffer;
              loadSound(self2, buffer);
            } else {
              error2();
            }
          };
          if (typeof Promise !== "undefined" && Howler.ctx.decodeAudioData.length === 1) {
            Howler.ctx.decodeAudioData(arraybuffer).then(success).catch(error2);
          } else {
            Howler.ctx.decodeAudioData(arraybuffer, success, error2);
          }
        };
        var loadSound = function(self2, buffer) {
          if (buffer && !self2._duration) {
            self2._duration = buffer.duration;
          }
          if (Object.keys(self2._sprite).length === 0) {
            self2._sprite = { __default: [0, self2._duration * 1e3] };
          }
          if (self2._state !== "loaded") {
            self2._state = "loaded";
            self2._emit("load");
            self2._loadQueue();
          }
        };
        var setupAudioContext = function() {
          if (!Howler.usingWebAudio) {
            return;
          }
          try {
            if (typeof AudioContext !== "undefined") {
              Howler.ctx = new AudioContext();
            } else if (typeof webkitAudioContext !== "undefined") {
              Howler.ctx = new webkitAudioContext();
            } else {
              Howler.usingWebAudio = false;
            }
          } catch (e) {
            Howler.usingWebAudio = false;
          }
          if (!Howler.ctx) {
            Howler.usingWebAudio = false;
          }
          var iOS = /iP(hone|od|ad)/.test(Howler._navigator && Howler._navigator.platform);
          var appVersion = Howler._navigator && Howler._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          var version = appVersion ? parseInt(appVersion[1], 10) : null;
          if (iOS && version && version < 9) {
            var safari = /safari/.test(Howler._navigator && Howler._navigator.userAgent.toLowerCase());
            if (Howler._navigator && !safari) {
              Howler.usingWebAudio = false;
            }
          }
          if (Howler.usingWebAudio) {
            Howler.masterGain = typeof Howler.ctx.createGain === "undefined" ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
            Howler.masterGain.gain.setValueAtTime(Howler._muted ? 0 : Howler._volume, Howler.ctx.currentTime);
            Howler.masterGain.connect(Howler.ctx.destination);
          }
          Howler._setup();
        };
        {
          exports.Howler = Howler;
          exports.Howl = Howl;
        }
        if (typeof commonjsGlobal !== "undefined") {
          commonjsGlobal.HowlerGlobal = HowlerGlobal;
          commonjsGlobal.Howler = Howler;
          commonjsGlobal.Howl = Howl;
          commonjsGlobal.Sound = Sound2;
        } else if (typeof window !== "undefined") {
          window.HowlerGlobal = HowlerGlobal;
          window.Howler = Howler;
          window.Howl = Howl;
          window.Sound = Sound2;
        }
      })();
    })(howler_core$1);
    howler_core = /* @__PURE__ */ _mergeNamespaces({
      __proto__: null
    }, [howler_core$1]);
  }
});

// node_modules/svelte-sound/dist/svelte-sound.js
var __defProp2, __defNormalProp2, __publicField2, Sound;
var init_svelte_sound = __esm({
  "node_modules/svelte-sound/dist/svelte-sound.js"() {
    __defProp2 = Object.defineProperty;
    __defNormalProp2 = (obj, key2, value) => key2 in obj ? __defProp2(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __publicField2 = (obj, key2, value) => {
      __defNormalProp2(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
      return value;
    };
    Sound = class {
      /**
       * Creates a new SyntheticSound instance.
       * @param options The options for the sound.
       */
      constructor(src, options2 = {}) {
        __publicField2(this, "src");
        __publicField2(this, "options");
        __publicField2(this, "howl");
        this.src = src;
        this.options = options2;
        this.create();
      }
      /**
       * Creates the Howl instance for the sound.
       */
      async create() {
        const { Howl } = await Promise.resolve().then(() => (init_howler_core_e669a980(), howler_core_e669a980_exports)).then((n) => n.h);
        const { loop, volume } = this.options;
        const sound2 = new Howl({
          src: this.src,
          loop: loop || false,
          volume: volume || 1,
          ...this.options
        });
        this.howl = sound2;
      }
      /**
       * Updates the options for the sound.
       * @param options The new options for the sound.
       */
      update(options2 = this.options) {
        this.unload();
        this.options = options2;
        this.create();
      }
      /**
       * Destroys the sound instance.
       */
      destroy() {
        this.stop();
        this.unload();
      }
      /**
       * Plays the sound.
       */
      play() {
        this.howl.play();
      }
      /**
       * Stops the sound.
       */
      stop() {
        this.howl.stop();
      }
      /**
       * Unloads the sound.
       */
      unload() {
        this.howl.unload();
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key2 in defaultExtendedIconProps) {
    if (key2 in defaultIconTransformations) {
      if (key2 in parent && !(key2 in result)) {
        result[key2] = defaultIconTransformations[key2];
      }
    } else if (key2 in child) {
      result[key2] = child[key2];
    } else if (key2 in parent) {
      result[key2] = parent[key2];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse3(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse3(name);
  tree.forEach(parse3);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data;
}
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  attributes.viewBox = box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString();
  return {
    attributes,
    body
  };
}
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
function removeCallback(storages, id) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items) {
      storage2.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage2], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames2) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe2(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe: subscribe2,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index4 = config.resources.indexOf(item.resource);
      if (index4 !== -1 && index4 !== config.index) {
        config.index = index4;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error2) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error2);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index4) => {
      config.index = index4;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
function getStoredItem(func, key2) {
  try {
    return func.getItem(key2);
  } catch (err) {
  }
}
function setStoredItem(func, key2, value) {
  try {
    func.setItem(key2, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key2) {
  try {
    func.removeItem(key2);
  } catch (err) {
  }
}
function setBrowserStorageItemsCount(storage2, value) {
  return setStoredItem(storage2, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage2) {
  return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}
function getBrowserStorage(key2) {
  const attr = key2 + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key2] = false;
}
function iterateBrowserStorage(key2, callback) {
  const func = getBrowserStorage(key2);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index4) => {
    const name = browserCachePrefix + index4.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback(data, index4)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key2].add(i);
      }
    }
  }
}
function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key2 in browserStorageConfig) {
    iterateBrowserStorage(key2, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage2 = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage2, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage2.lastModifiedCached = storage2.lastModifiedCached ? Math.min(storage2.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}
function updateLastModified(storage2, lastModified) {
  const lastValue = storage2.lastModifiedCached;
  if (
    // Matches or newer
    lastValue && lastValue >= lastModified
  ) {
    return lastValue === lastModified;
  }
  storage2.lastModifiedCached = lastModified;
  if (lastValue) {
    for (const key2 in browserStorageConfig) {
      iterateBrowserStorage(key2, (item) => {
        const iconSet = item.data;
        return item.provider !== storage2.provider || iconSet.prefix !== storage2.prefix || iconSet.lastModified === lastModified;
      });
    }
  }
  return true;
}
function storeInBrowserStorage(storage2, data) {
  if (!browserStorageStatus) {
    initBrowserStorage();
  }
  function store(key2) {
    let func;
    if (!browserStorageConfig[key2] || !(func = getBrowserStorage(key2))) {
      return;
    }
    const set = browserStorageEmptyItems[key2];
    let index4;
    if (set.size) {
      set.delete(index4 = Array.from(set).shift());
    } else {
      index4 = getBrowserStorageItemsCount(func);
      if (!setBrowserStorageItemsCount(func, index4 + 1)) {
        return;
      }
    }
    const item = {
      cached: Math.floor(Date.now() / browserStorageHour),
      provider: storage2.provider,
      data
    };
    return setStoredItem(
      func,
      browserCachePrefix + index4.toString(),
      JSON.stringify(item)
    );
  }
  if (data.lastModified && !updateLastModified(storage2, data.lastModified)) {
    return;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
}
function emptyCallback() {
}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad) {
    storage2.iconsToLoad = icons;
  } else {
    storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  }
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const { provider, prefix } = storage2;
      const icons2 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      let api;
      if (!icons2 || !(api = getAPIModule(provider))) {
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          if (typeof data !== "object") {
            item.icons.forEach((name) => {
              storage2.missing.add(name);
            });
          } else {
            try {
              const parsed = addIconSet(
                storage2,
                data
              );
              if (!parsed.length) {
                return;
              }
              const pending = storage2.pendingIcons;
              if (pending) {
                parsed.forEach((name) => {
                  pending.delete(name);
                });
              }
              storeInBrowserStorage(storage2, data);
            } catch (err) {
              console.error(err);
            }
          }
          loadedNewIcons(storage2);
        });
      });
    });
  }
}
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key2 in item) {
    const value = item[key2];
    const valueType = typeof value;
    if (key2 in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key2] = value;
      }
    } else if (valueType === typeof result[key2]) {
      result[key2] = key2 === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
function render(icon, props) {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const mode = props.mode || "svg";
  const componentProps = mode === "svg" ? { ...svgDefaults } : {};
  if (icon.body.indexOf("xlink:") === -1) {
    delete componentProps["xmlns:xlink"];
  }
  let style = typeof props.style === "string" ? props.style : "";
  for (let key2 in props) {
    const value = props[key2];
    if (value === void 0) {
      continue;
    }
    switch (key2) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key2] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key2] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key2] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key2.slice(0, 3) === "on:") {
          break;
        }
        if (defaultExtendedIconCustomisations[key2] === void 0) {
          componentProps[key2] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (mode === "svg") {
    Object.assign(componentProps, renderAttribs);
    if (style !== "") {
      componentProps.style = style;
    }
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    return {
      svg: true,
      attributes: componentProps,
      body: replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifySvelte")
    };
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  const url = svgToURL(html);
  const styles = {
    "--svg": url
  };
  const size = (prop) => {
    const value = renderAttribs[prop];
    if (value) {
      styles[prop] = fixSize(value);
    }
  };
  size("width");
  size("height");
  Object.assign(styles, commonProps, useMask ? monotoneProps : coloredProps);
  let customStyle = "";
  for (const key2 in styles) {
    customStyle += key2 + ": " + styles[key2] + ";";
  }
  componentProps.style = customStyle + style;
  return {
    svg: false,
    attributes: componentProps
  };
}
function checkIconState(icon, state, mounted, callback, onload) {
  function abortLoading() {
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  }
  if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
    state.name = "";
    abortLoading();
    return { data: { ...defaultIconProps, ...icon } };
  }
  let iconName;
  if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
    abortLoading();
    return null;
  }
  const data = getIconData(iconName);
  if (!data) {
    if (mounted && (!state.loading || state.loading.name !== icon)) {
      abortLoading();
      state.name = "";
      state.loading = {
        name: icon,
        abort: loadIcons([iconName], callback)
      };
    }
    return null;
  }
  abortLoading();
  if (state.name !== icon) {
    state.name = icon;
    if (onload && !state.destroyed) {
      onload(icon);
    }
  }
  const classes = ["iconify"];
  if (iconName.prefix !== "") {
    classes.push("iconify--" + iconName.prefix);
  }
  if (iconName.provider !== "") {
    classes.push("iconify--" + iconName.provider);
  }
  return { data, classes };
}
function generateIcon(icon, props) {
  return icon ? render({
    ...defaultIconProps,
    ...icon
  }, props) : null;
}
function typewriter(node, { speed: speed2 = 1 }) {
  const textContent = node.textContent || "";
  const duration = textContent.length / (speed2 * 0.01);
  return {
    duration,
    tick: (t) => {
      const i = Math.trunc(textContent.length * t);
      node.textContent = textContent.slice(0, i);
    }
  };
}
var matchIconName, stringToIcon, validateIconName, defaultIconDimensions, defaultIconTransformations, defaultIconProps, defaultExtendedIconProps, optionalPropertyDefaults, dataStorage, simpleNames, defaultIconSizeCustomisations, defaultIconCustomisations, unitsSplit, unitsTest, isUnsetKeyword, regex, randomPrefix, counter, storage, configStorage, fallBackAPISources, fallBackAPI, detectFetch, fetchModule, prepare, send, fetchAPIModule, idCounter, defaultConfig, redundancyCache, browserCacheVersion, browserCachePrefix, browserCacheCountKey, browserCacheVersionKey, browserStorageHour, browserStorageCacheExpiration, browserStorageConfig, browserStorageEmptyItems, browserStorageStatus, _window, loadIcons, separator, defaultExtendedIconCustomisations, svgDefaults, commonProps, monotoneProps, coloredProps, propsToAdd, propsToAddTo, Icon, poppedBalloonCount, lightstates, css, Lightbulb, Hidden_object, Single_typewriter, Draggble_object, ripping, Gift_box, hbd, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_index2();
    init_svelte_sound();
    init_chunks();
    matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    stringToIcon = (value, validate, allowSimpleName, provider = "") => {
      const colonSeparated = value.split(":");
      if (value.slice(0, 1) === "@") {
        if (colonSeparated.length < 2 || colonSeparated.length > 3) {
          return null;
        }
        provider = colonSeparated.shift().slice(1);
      }
      if (colonSeparated.length > 3 || !colonSeparated.length) {
        return null;
      }
      if (colonSeparated.length > 1) {
        const name2 = colonSeparated.pop();
        const prefix = colonSeparated.pop();
        const result = {
          // Allow provider without '@': "provider:prefix:name"
          provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
          prefix,
          name: name2
        };
        return validate && !validateIconName(result) ? null : result;
      }
      const name = colonSeparated[0];
      const dashSeparated = name.split("-");
      if (dashSeparated.length > 1) {
        const result = {
          provider,
          prefix: dashSeparated.shift(),
          name: dashSeparated.join("-")
        };
        return validate && !validateIconName(result) ? null : result;
      }
      if (allowSimpleName && provider === "") {
        const result = {
          provider,
          prefix: "",
          name
        };
        return validate && !validateIconName(result, allowSimpleName) ? null : result;
      }
      return null;
    };
    validateIconName = (icon, allowSimpleName) => {
      if (!icon) {
        return false;
      }
      return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
    };
    defaultIconDimensions = Object.freeze(
      {
        left: 0,
        top: 0,
        width: 16,
        height: 16
      }
    );
    defaultIconTransformations = Object.freeze({
      rotate: 0,
      vFlip: false,
      hFlip: false
    });
    defaultIconProps = Object.freeze({
      ...defaultIconDimensions,
      ...defaultIconTransformations
    });
    defaultExtendedIconProps = Object.freeze({
      ...defaultIconProps,
      body: "",
      hidden: false
    });
    optionalPropertyDefaults = {
      provider: "",
      aliases: {},
      not_found: {},
      ...defaultIconDimensions
    };
    dataStorage = /* @__PURE__ */ Object.create(null);
    simpleNames = false;
    defaultIconSizeCustomisations = Object.freeze({
      width: null,
      height: null
    });
    defaultIconCustomisations = Object.freeze({
      // Dimensions
      ...defaultIconSizeCustomisations,
      // Transformations
      ...defaultIconTransformations
    });
    unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
    unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
    isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
    regex = /\sid="(\S+)"/g;
    randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
    counter = 0;
    storage = /* @__PURE__ */ Object.create(null);
    configStorage = /* @__PURE__ */ Object.create(null);
    fallBackAPISources = [
      "https://api.simplesvg.com",
      "https://api.unisvg.com"
    ];
    fallBackAPI = [];
    while (fallBackAPISources.length > 0) {
      if (fallBackAPISources.length === 1) {
        fallBackAPI.push(fallBackAPISources.shift());
      } else {
        if (Math.random() > 0.5) {
          fallBackAPI.push(fallBackAPISources.shift());
        } else {
          fallBackAPI.push(fallBackAPISources.pop());
        }
      }
    }
    configStorage[""] = createAPIConfig({
      resources: ["https://api.iconify.design"].concat(fallBackAPI)
    });
    detectFetch = () => {
      let callback;
      try {
        callback = fetch;
        if (typeof callback === "function") {
          return callback;
        }
      } catch (err) {
      }
    };
    fetchModule = detectFetch();
    prepare = (provider, prefix, icons) => {
      const results = [];
      const maxLength = calculateMaxLength(provider, prefix);
      const type = "icons";
      let item = {
        type,
        provider,
        prefix,
        icons: []
      };
      let length = 0;
      icons.forEach((name, index4) => {
        length += name.length + 1;
        if (length >= maxLength && index4 > 0) {
          results.push(item);
          item = {
            type,
            provider,
            prefix,
            icons: []
          };
          length = name.length;
        }
        item.icons.push(name);
      });
      results.push(item);
      return results;
    };
    send = (host, params, callback) => {
      if (!fetchModule) {
        callback("abort", 424);
        return;
      }
      let path = getPath(params.provider);
      switch (params.type) {
        case "icons": {
          const prefix = params.prefix;
          const icons = params.icons;
          const iconsList = icons.join(",");
          const urlParams = new URLSearchParams({
            icons: iconsList
          });
          path += prefix + ".json?" + urlParams.toString();
          break;
        }
        case "custom": {
          const uri = params.uri;
          path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
          break;
        }
        default:
          callback("abort", 400);
          return;
      }
      let defaultError = 503;
      fetchModule(host + path).then((response) => {
        const status = response.status;
        if (status !== 200) {
          setTimeout(() => {
            callback(shouldAbort(status) ? "abort" : "next", status);
          });
          return;
        }
        defaultError = 501;
        return response.json();
      }).then((data) => {
        if (typeof data !== "object" || data === null) {
          setTimeout(() => {
            if (data === 404) {
              callback("abort", data);
            } else {
              callback("next", defaultError);
            }
          });
          return;
        }
        setTimeout(() => {
          callback("success", data);
        });
      }).catch(() => {
        callback("next", defaultError);
      });
    };
    fetchAPIModule = {
      prepare,
      send
    };
    idCounter = 0;
    defaultConfig = {
      resources: [],
      index: 0,
      timeout: 2e3,
      rotate: 750,
      random: false,
      dataAfterTimeout: false
    };
    redundancyCache = /* @__PURE__ */ Object.create(null);
    browserCacheVersion = "iconify2";
    browserCachePrefix = "iconify";
    browserCacheCountKey = browserCachePrefix + "-count";
    browserCacheVersionKey = browserCachePrefix + "-version";
    browserStorageHour = 36e5;
    browserStorageCacheExpiration = 168;
    browserStorageConfig = {
      local: true,
      session: true
    };
    browserStorageEmptyItems = {
      local: /* @__PURE__ */ new Set(),
      session: /* @__PURE__ */ new Set()
    };
    browserStorageStatus = false;
    _window = typeof window === "undefined" ? {} : window;
    loadIcons = (icons, callback) => {
      const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
      const sortedIcons = sortIcons(cleanedIcons);
      if (!sortedIcons.pending.length) {
        let callCallback = true;
        if (callback) {
          setTimeout(() => {
            if (callCallback) {
              callback(
                sortedIcons.loaded,
                sortedIcons.missing,
                sortedIcons.pending,
                emptyCallback
              );
            }
          });
        }
        return () => {
          callCallback = false;
        };
      }
      const newIcons = /* @__PURE__ */ Object.create(null);
      const sources = [];
      let lastProvider, lastPrefix;
      sortedIcons.pending.forEach((icon) => {
        const { provider, prefix } = icon;
        if (prefix === lastPrefix && provider === lastProvider) {
          return;
        }
        lastProvider = provider;
        lastPrefix = prefix;
        sources.push(getStorage(provider, prefix));
        const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
        if (!providerNewIcons[prefix]) {
          providerNewIcons[prefix] = [];
        }
      });
      sortedIcons.pending.forEach((icon) => {
        const { provider, prefix, name } = icon;
        const storage2 = getStorage(provider, prefix);
        const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
        if (!pendingQueue.has(name)) {
          pendingQueue.add(name);
          newIcons[provider][prefix].push(name);
        }
      });
      sources.forEach((storage2) => {
        const { provider, prefix } = storage2;
        if (newIcons[provider][prefix].length) {
          loadNewIcons(storage2, newIcons[provider][prefix]);
        }
      });
      return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
    };
    separator = /[\s,]+/;
    defaultExtendedIconCustomisations = {
      ...defaultIconCustomisations,
      inline: false
    };
    svgDefaults = {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "aria-hidden": true,
      "role": "img"
    };
    commonProps = {
      display: "inline-block"
    };
    monotoneProps = {
      "background-color": "currentColor"
    };
    coloredProps = {
      "background-color": "transparent"
    };
    propsToAdd = {
      image: "var(--svg)",
      repeat: "no-repeat",
      size: "100% 100%"
    };
    propsToAddTo = {
      "-webkit-mask": monotoneProps,
      "mask": monotoneProps,
      "background": coloredProps
    };
    for (const prefix in propsToAddTo) {
      const list = propsToAddTo[prefix];
      for (const prop in propsToAdd) {
        list[prefix + "-" + prop] = propsToAdd[prop];
      }
    }
    allowSimpleNames(true);
    setAPIModule("", fetchAPIModule);
    if (typeof document !== "undefined" && typeof window !== "undefined") {
      initBrowserStorage();
      const _window2 = window;
      if (_window2.IconifyPreload !== void 0) {
        const preload = _window2.IconifyPreload;
        const err = "Invalid IconifyPreload syntax.";
        if (typeof preload === "object" && preload !== null) {
          (preload instanceof Array ? preload : [preload]).forEach((item) => {
            try {
              if (
                // Check if item is an object and not null/array
                typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
                typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
                !addCollection(item)
              ) {
                console.error(err);
              }
            } catch (e) {
              console.error(err);
            }
          });
        }
      }
      if (_window2.IconifyProviders !== void 0) {
        const providers = _window2.IconifyProviders;
        if (typeof providers === "object" && providers !== null) {
          for (let key2 in providers) {
            const err = "IconifyProviders[" + key2 + "] is invalid.";
            try {
              const value = providers[key2];
              if (typeof value !== "object" || !value || value.resources === void 0) {
                continue;
              }
              if (!addAPIProvider(key2, value)) {
                console.error(err);
              }
            } catch (e) {
              console.error(err);
            }
          }
        }
      }
    }
    Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const state = {
        // Last icon name
        name: "",
        // Loading status
        loading: null,
        // Destroyed status
        destroyed: false
      };
      let mounted = false;
      let data;
      const onLoad = (icon) => {
        if (typeof $$props.onLoad === "function") {
          $$props.onLoad(icon);
        }
        const dispatch = createEventDispatcher();
        dispatch("load", { icon });
      };
      function loaded() {
      }
      onDestroy(() => {
        state.destroyed = true;
        if (state.loading) {
          state.loading.abort();
          state.loading = null;
        }
      });
      {
        {
          const iconData = checkIconState($$props.icon, state, mounted, loaded, onLoad);
          data = iconData ? generateIcon(iconData.data, $$props) : null;
          if (data && iconData.classes) {
            data.attributes["class"] = (typeof $$props["class"] === "string" ? $$props["class"] + " " : "") + iconData.classes.join(" ");
          }
        }
      }
      return `${data ? `${data.svg ? `<svg${spread([escape_object(data.attributes)], {})}><!-- HTML_TAG_START -->${data.body}<!-- HTML_TAG_END --></svg>` : `<span${spread([escape_object(data.attributes)], {})}></span>`}` : ``}`;
    });
    poppedBalloonCount = writable(0);
    lightstates = writable(false);
    css = {
      code: ".transition.svelte-1t6u28v{transition:fill 1s ease}",
      map: null
    };
    Lightbulb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let glass = "#c0c0c0";
      let circleColor = "#ffffff";
      let filament = "#000000";
      let bottomRectColor = "#99AAB5";
      let linesColor = "#CCD6DD";
      let xAdjust = 0;
      let yAdjust = 0;
      let { mouseFollow = true } = $$props;
      let { changeColor = false } = $$props;
      let { lightState = false } = $$props;
      let { constantlyChangeColor = false } = $$props;
      let { yPosition = xAdjust } = $$props;
      let { xPosition = yAdjust } = $$props;
      lightstates.subscribe((value) => {
        lightState = value;
      });
      let x = yPosition;
      let y = xPosition - 300;
      if ($$props.mouseFollow === void 0 && $$bindings.mouseFollow && mouseFollow !== void 0)
        $$bindings.mouseFollow(mouseFollow);
      if ($$props.changeColor === void 0 && $$bindings.changeColor && changeColor !== void 0)
        $$bindings.changeColor(changeColor);
      if ($$props.lightState === void 0 && $$bindings.lightState && lightState !== void 0)
        $$bindings.lightState(lightState);
      if ($$props.constantlyChangeColor === void 0 && $$bindings.constantlyChangeColor && constantlyChangeColor !== void 0)
        $$bindings.constantlyChangeColor(constantlyChangeColor);
      if ($$props.yPosition === void 0 && $$bindings.yPosition && yPosition !== void 0)
        $$bindings.yPosition(yPosition);
      if ($$props.xPosition === void 0 && $$bindings.xPosition && xPosition !== void 0)
        $$bindings.xPosition(xPosition);
      $$result.css.add(css);
      return `
<div class="relative p-16 grid grid-flow-col"${add_attribute("style", `left: ${x - xAdjust}px; top: ${y - yAdjust * 2.15}px;`, 0)}>${lightState ? `<button class="absolute p-20 -z-0 rounded-full animate-fade blur-3xl" style="${"background-color: " + escape(glass, true) + "; top: 2px; left: 2px;"}"></button>` : ``}
  <button class="z-10 hover:animate-wiggle-more"><svg class="rotate-180" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path class="transition z-10 svelte-1t6u28v"${add_attribute("fill", glass, 0)} d="M29 11.06c0 6.439-5 7.439-5 13.44c0 3.098-3.123 3.359-5.5 3.359c-2.053 0-6.586-.779-6.586-3.361C11.914 18.5 7 17.5 7 11.06C7 5.029 12.285.14 18.083.14C23.883.14 29 5.029 29 11.06z"></path><path class="animate-none"${add_attribute("fill", circleColor, 0)} d="M22.167 32.5c0 .828-2.234 2.5-4.167 2.5c-1.933 0-4.167-1.672-4.167-2.5c0-.828 2.233-.5 4.167-.5c1.933 0 4.167-.328 4.167.5z"></path><path class="animate-none"${add_attribute("fill", filament, 0)} d="M22.707 10.293a.999.999 0 0 0-1.414 0L18 13.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414L17 15.414V26a1 1 0 1 0 2 0V15.414l3.707-3.707a.999.999 0 0 0 0-1.414z"></path><path class="animate-none"${add_attribute("fill", bottomRectColor, 0)} d="M24 31a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-6h12v6z"></path><path class="animate-none"${add_attribute("fill", linesColor, 0)} d="M11.999 32a1 1 0 0 1-.163-1.986l12-2a.994.994 0 0 1 1.15.822a.999.999 0 0 1-.822 1.15l-12 2a.927.927 0 0 1-.165.014zm0-4a1 1 0 0 1-.163-1.986l12-2a.995.995 0 0 1 1.15.822a.999.999 0 0 1-.822 1.15l-12 2a.927.927 0 0 1-.165.014z"></path></svg></button></div>

`;
    });
    Hidden_object = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let x = 0;
      let y = 0;
      lightstates.subscribe((value) => {
      });
      return `<div class="p-20 absolute" style="${"top:" + escape(x, true) + "px; left:" + escape(y, true) + "px; opacity:1"}">${``}
  ${`<div class="absolute top-0 left-0 z-10 p-20 bg-white/0 blur-3xl rounded-full"></div>`}</div>`;
    });
    Single_typewriter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { speed = 1.5 } = $$props;
      let { textToDisplay = [] } = $$props;
      let { delay = 2e3 } = $$props;
      let { noloop = true } = $$props;
      let { color = "rgb(253 186 116)" } = $$props;
      let { fontStyle = "normal" } = $$props;
      let { fontFamily = "Sans-serif" } = $$props;
      let { bottom = "30px" } = $$props;
      let top = "";
      let currentTextIndex = 0;
      if ($$props.speed === void 0 && $$bindings.speed && speed !== void 0)
        $$bindings.speed(speed);
      if ($$props.textToDisplay === void 0 && $$bindings.textToDisplay && textToDisplay !== void 0)
        $$bindings.textToDisplay(textToDisplay);
      if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0)
        $$bindings.delay(delay);
      if ($$props.noloop === void 0 && $$bindings.noloop && noloop !== void 0)
        $$bindings.noloop(noloop);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.fontStyle === void 0 && $$bindings.fontStyle && fontStyle !== void 0)
        $$bindings.fontStyle(fontStyle);
      if ($$props.fontFamily === void 0 && $$bindings.fontFamily && fontFamily !== void 0)
        $$bindings.fontFamily(fontFamily);
      if ($$props.bottom === void 0 && $$bindings.bottom && bottom !== void 0)
        $$bindings.bottom(bottom);
      if ($$props.typewriter === void 0 && $$bindings.typewriter && typewriter !== void 0)
        $$bindings.typewriter(typewriter);
      return `${textToDisplay.length > 0 ? `
    <div class="absolute font-thin text-4xl p-30" style="${"top:" + escape(top, true) + "; bottom:" + escape(bottom, true) + "; color:" + escape(color, true) + ";font-style:" + escape(fontStyle, true) + "; font-family:" + escape(fontFamily, true)}">${escape(textToDisplay[currentTextIndex])}</div>` : ``}`;
    });
    Draggble_object = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let style;
      let id = Math.random().toString(36).substr(2, 10);
      let state = {
        dragging: null,
        pos: { x: 0, y: 0 },
        eventToCoordinates(event) {
          return { x: event.clientX, y: event.clientY };
        }
      };
      style = `transform: translate(${state.pos.x}px, ${state.pos.y}px)`;
      return `
<div${add_attribute("id", id, 0)}${add_attribute("style", style, 0)} class="cursor-pointer">${slots.default ? slots.default({}) : ``}</div>`;
    });
    ripping = "/_app/immutable/assets/ripping.7ea31668.mp3";
    Gift_box = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { stringColor = "#597B91" } = $$props;
      let { highlightColor = "#ffffff" } = $$props;
      let { width = "100" } = $$props;
      let { height = "100" } = $$props;
      let delayOver = false;
      let { delay = 5e3 } = $$props;
      new Sound(ripping, { volume: 1 });
      let balloonTop = 0;
      let balloonLeft = 0;
      setTimeout(
        () => {
          delayOver = true;
        },
        delay
      );
      if ($$props.stringColor === void 0 && $$bindings.stringColor && stringColor !== void 0)
        $$bindings.stringColor(stringColor);
      if ($$props.highlightColor === void 0 && $$bindings.highlightColor && highlightColor !== void 0)
        $$bindings.highlightColor(highlightColor);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      if ($$props.height === void 0 && $$bindings.height && height !== void 0)
        $$bindings.height(height);
      if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0)
        $$bindings.delay(delay);
      return `${`${delayOver ? `<div class="absolute z-20 animate-move-up-to-spot"${add_attribute("style", `top: ${balloonTop}px; left: ${balloonLeft}px;`, 0)}><button class="z-10 rounded-full animate-wiggle animate-infinite animate-duration-[3000ms]"><svg xmlns="http://www.w3.org/2000/svg" width="312" height="312" viewBox="0 0 512 512"><path fill="#FF473E" d="M472.469 389.156L273.237 499.735c-9.558 5.305-25.198 5.305-34.755 0L39.249 389.156c-4.779-2.652-7.168-6.149-7.168-9.645h-2.116V132.489h449.673v247.022c0 3.496-2.389 6.993-7.169 9.645z"></path><path fill="#FF6E83" d="M479.638 132.489v247.022c0 3.497-2.389 6.993-7.168 9.646L273.237 499.735c-4.97 2.758-11.583 4.072-18.132 3.959c.155-123.695 3.671-247.546-.173-371.206h224.706z"></path><path fill="#FFA9BA" d="M238.481 252.712L39.249 142.133c-9.558-5.305-9.558-13.985 0-19.29L238.481 12.265c9.558-5.305 25.198-5.305 34.755 0l199.233 110.579c9.558 5.305 9.558 13.985 0 19.29L273.237 252.712c-9.558 5.305-25.198 5.305-34.756 0z"></path><path fill="#FFD4DE" d="M391.09 74.124a6.502 6.502 0 0 1-3.442 5.681L148.934 207.05a6.445 6.445 0 0 1-1.026.438l-.807.451v237.47a6.5 6.5 0 0 1-9.654 5.684l-40-22.201a6.5 6.5 0 0 1-3.346-5.684V192.123a26.49 26.49 0 0 1 9.913-20.655l.236-.184c.524-.41 1.021-.771 1.532-1.116a27.095 27.095 0 0 1 2.352-1.428l231.74-123.528a6.498 6.498 0 0 1 6.212.053l41.659 23.121a6.502 6.502 0 0 1 3.345 5.738zm22.013 100.531a26.438 26.438 0 0 0-5.148-4.523c-.125-.085-.25-.17-.397-.266a26.054 26.054 0 0 0-1.905-1.129L173.914 45.211a6.495 6.495 0 0 0-6.212.053l-41.659 23.121a6.499 6.499 0 0 0 .097 11.42L364.854 207.05c.332.177.676.323 1.027.439l.806.451v237.47a6.5 6.5 0 0 0 9.654 5.684l40-22.201a6.503 6.503 0 0 0 3.346-5.684V192.123a26.498 26.498 0 0 0-6.584-17.468z"></path><path fill="#FF6E83" d="M335.602 137.083c0 16.311-20.006 28.149-47.569 28.149c-11.241 0-21.222-1.971-29.104-5.409a7.462 7.462 0 0 0-6.345.189c-8.215 4.146-19.108 6.562-31.548 6.562c-27.563 0-47.569-11.838-47.569-28.149c0-8.212 5.072-15.289 13.626-20.294c3.37-1.971 4.785-6.178 3.116-9.707c-6.097-12.894-5.901-24.991 1.577-32.469c3.873-3.873 9.177-5.92 15.34-5.92c4.33 0 9.032 1.023 13.863 2.944a7.61 7.61 0 0 0 9.844-4.142c4.965-11.851 13.18-19.15 23.03-19.15c9.682 0 17.787 7.051 22.776 18.547c1.656 3.816 6.027 5.637 9.872 4.05c5.048-2.083 9.966-3.197 14.482-3.197c7.785 0 12.639 3.219 15.34 5.92c7.351 7.351 7.667 19.164 1.885 31.811c-1.622 3.548-.184 7.746 3.212 9.665c8.882 5.018 14.172 12.217 14.172 20.6z"></path></svg></button></div>` : ``}`}`;
    });
    hbd = "/_app/immutable/assets/hbd.592ebc57.mp3";
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let ballonpopCount = 0;
      let releaseGift = false;
      new Sound(hbd, { loop: true });
      const numOfBallons = Math.floor(Math.random() * 20) + 15;
      Array.from({ length: numOfBallons }, (_, i2) => i2 + 1);
      lightstates.subscribe((value) => {
      });
      poppedBalloonCount.subscribe((value) => {
        ballonpopCount = value;
      });
      function releaseGifts() {
        releaseGift = true;
      }
      {
        if (ballonpopCount == 6) {
          releaseGifts();
        }
      }
      return `

<body class="h-[200vh] w-[200vw] overflow-hidden" style="display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden;">${`
    ${validate_component(Single_typewriter, "SingleTypewriter").$$render(
        $$result,
        {
          delay: 2e3,
          speed: 1.5,
          textToDisplay: [
            "",
            "",
            "Hi Nelly...",
            "I might have forgotten to tell you something...",
            "I tend to go overboard with my birthday presents.",
            "But anyways...",
            "",
            "Its a bit dark in here...",
            "",
            "Find the light switch.",
            "Use the little lightbulb to find it."
          ]
        },
        {},
        {}
      )}

    ${validate_component(Lightbulb, "Lightbulb").$$render($$result, {}, {}, {})}`}

  ${`${validate_component(Hidden_object, "HiddenObject").$$render($$result, {}, {}, {
        default: () => {
          return `<button class="p-10">${`${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              icon: "line-md:switch-off-filled-to-switch-filled-transition",
              height: "100",
              width: "100"
            },
            {},
            {}
          )}`}</button>`;
        }
      })}`}

  
  ${`<div id="blackout" class="absolute top-0 left-0 h-full w-full -z-40 bg-black"></div>`}

  ${``}

  ${releaseGift ? `${validate_component(Gift_box, "GiftBox").$$render($$result, { delay: "1" }, {}, {
        default: () => {
          return `
      <button>${`${validate_component(Draggble_object, "DraggbleObject").$$render($$result, {}, {}, {
            default: () => {
              return `<div title="Double Click" class="w-44 h-44"><img class="pointer-events-none" src="src/lib/img/b-cover.png" alt="banner"></div>`;
            }
          })}`}</button>`;
        }
      })}` : ``}</body>
`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    imports3 = ["_app/immutable/nodes/2.ef9cb0c4.js", "_app/immutable/chunks/index.51f98ca3.js", "_app/immutable/chunks/preload-helper.a4192956.js", "_app/immutable/chunks/index.4da43e74.js"];
    stylesheets3 = ["_app/immutable/assets/2.7848f722.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_index2();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `


${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}

${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\r\n		<meta name="viewport" content="width=device-width" />\r\n		' + head + '\r\n	</head>\r\n	<body data-sveltekit-preload-data="hover" class="bg-black text-white">\r\n		<div style="display: contents">' + body + "</div>\r\n		\r\n	</body>\r\n\r\n</html>\r\n",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "yu3zq3"
};
function get_hooks() {
  return {};
}

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index5 = p++;
    indexes.set(thing, index5);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index5] = `["${key2}",${flatten(value2)}]`;
        return index5;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index5] = str;
    return index5;
  }
  const index4 = flatten(value);
  if (index4 < 0)
    return `${index4}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_chunks();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD"
]);
var PAGE_METHODS = /* @__PURE__ */ new Set(["GET", "POST", "HEAD"]);
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} [data]
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function error(status, body) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, body);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder$3.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
var encoder$3 = new TextEncoder();
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    const encoded = encoder$3.encode(body);
    headers.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers
    });
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | import('../runtime/control.js').HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = Array.from(ENDPOINT_METHODS).filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (ENDPOINT_METHODS.has(method) && !PAGE_METHODS.has(method)) {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: cloned_headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets4 = new Set(client.stylesheets);
  const fonts4 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets4.add(url);
      for (const url of node.fonts)
        fonts4.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets4) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts4) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global2 = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global2
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global2} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global2) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global2}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global2}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error2.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index4 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index4]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name, value, opts = {}) {
      set_internal(name, value, { ...defaults, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name, value, opts) {
      return (0, import_cookie.serialize)(name, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, opts) {
    const path = opts.path ?? default_path;
    new_cookies[name] = {
      name,
      value,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str);
            set_internal(
              name,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
var valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
var valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
var valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
var valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "fallback",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
var validate_layout_exports = validator(valid_layout_exports);
var validate_page_exports = validator(valid_page_exports);
var validate_layout_server_exports = validator(valid_layout_server_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    set_private_env(
      filter_private_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    set_public_env(
      filter_public_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    if (!__privateGet(this, _options).hooks) {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve }) => resolve(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/vercel-tmp/fn/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["favicon.ico", "favicon.png"]),
    mimeTypes: { ".ico": "image/vnd.microsoft.icon", ".png": "image/png" },
    _: {
      client: { "start": "_app/immutable/entry/start.98f30857.js", "app": "_app/immutable/entry/app.1d94f9bc.js", "imports": ["_app/immutable/entry/start.98f30857.js", "_app/immutable/chunks/index.51f98ca3.js", "_app/immutable/chunks/singletons.d6fefa03.js", "_app/immutable/chunks/index.4da43e74.js", "_app/immutable/entry/app.1d94f9bc.js", "_app/immutable/chunks/preload-helper.a4192956.js", "_app/immutable/chunks/index.51f98ca3.js"], "stylesheets": [], "fonts": [] },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      }
    }
  };
})();

// .svelte-kit/vercel-tmp/fn/edge.js
var server = new Server(manifest);
var initialized = server.init({
  env: (
    /** @type {Record<string, string>} */
    process.env
  )
});
var edge_default = async (request, context) => {
  await initialized;
  return server.respond(request, {
    getClientAddress() {
      return (
        /** @type {string} */
        request.headers.get("x-forwarded-for")
      );
    },
    platform: {
      context
    }
  });
};
export {
  edge_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

svelte-sound/dist/howler.core-e669a980.js:
  (*!
   *  howler.js v2.2.3
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
*/
//# sourceMappingURL=index.js.map
