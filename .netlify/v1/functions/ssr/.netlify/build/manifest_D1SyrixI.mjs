import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_By-cxFLT.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/ADMIN/Documents/Web%20Project/IPGGhana/","cacheDir":"file:///C:/Users/ADMIN/Documents/Web%20Project/IPGGhana/node_modules/.astro/","outDir":"file:///C:/Users/ADMIN/Documents/Web%20Project/IPGGhana/dist/","srcDir":"file:///C:/Users/ADMIN/Documents/Web%20Project/IPGGhana/src/","publicDir":"file:///C:/Users/ADMIN/Documents/Web%20Project/IPGGhana/public/","buildClientDir":"file:///C:/Users/ADMIN/Documents/Web%20Project/IPGGhana/dist/","buildServerDir":"file:///C:/Users/ADMIN/Documents/Web%20Project/IPGGhana/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"people/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/people","isIndex":true,"type":"page","pattern":"^\\/people\\/?$","segments":[[{"content":"people","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/people/index.astro","pathname":"/people","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"privacy-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/privacy-policy\\/?$","segments":[[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy-policy.astro","pathname":"/privacy-policy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"publications/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/publications","isIndex":true,"type":"page","pattern":"^\\/publications\\/?$","segments":[[{"content":"publications","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/publications/index.astro","pathname":"/publications","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"terms-of-service/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms-of-service","isIndex":false,"type":"page","pattern":"^\\/terms-of-service\\/?$","segments":[[{"content":"terms-of-service","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms-of-service.astro","pathname":"/terms-of-service","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/admin/[...params]","pattern":"^\\/admin(?:\\/(.*?))?\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@sanity/astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}}],"site":"https://africapolicylens.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/@sanity/astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/publications/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/people/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/people/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/privacy-policy.astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/publications/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/pages/terms-of-service.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:node_modules/@sanity/astro/dist/studio/studio-route@_@astro":"pages/admin/_---params_.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/people/[slug]@_@astro":"pages/people/_slug_.astro.mjs","\u0000@astro-page:src/pages/people/index@_@astro":"pages/people.astro.mjs","\u0000@astro-page:src/pages/privacy-policy@_@astro":"pages/privacy-policy.astro.mjs","\u0000@astro-page:src/pages/publications/[slug]@_@astro":"pages/publications/_slug_.astro.mjs","\u0000@astro-page:src/pages/publications/index@_@astro":"pages/publications.astro.mjs","\u0000@astro-page:src/pages/terms-of-service@_@astro":"pages/terms-of-service.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D1SyrixI.mjs","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C5f11r9o.mjs","C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/layouts/MainLayout.astro?astro&type=script&index=1&lang.ts":"_astro/MainLayout.astro_astro_type_script_index_1_lang.DDCNxuYb.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts":"_astro/MainLayout.astro_astro_type_script_index_0_lang.Dzq32K65.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/components/CopyButton.astro?astro&type=script&index=0&lang.ts":"_astro/CopyButton.astro_astro_type_script_index_0_lang.cHhEpwZs.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/lib/_chunks-es/resources2.mjs":"_astro/resources2.D6hvydvy.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/lib/_chunks-es/resources4.mjs":"_astro/resources4.BSzzlzyt.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/lib/_chunks-es/resources.mjs":"_astro/resources.DJU0_AX_.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/lib/_chunks-es/resources5.mjs":"_astro/resources5.mRQpK8D-.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/lib/_chunks-es/resources3.mjs":"_astro/resources3.DfJHmhIH.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/lib/_chunks-es/ViteDevServerStopped.mjs":"_astro/ViteDevServerStopped.CyQy1hrE.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.LmvMvrNn.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/@sanity/ui/dist/_chunks-es/refractor.mjs":"_astro/refractor.BdAvBY-7.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/@sanity/vision/lib/_chunks-es/resources.mjs":"_astro/resources.D3-rjlzv.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/lib/_chunks-es/resources6.mjs":"_astro/resources6.C8qUfVua.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/lib/_chunks-es/index.mjs":"_astro/index.ByfnXj3f.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/lib/_chunks-es/index2.mjs":"_astro/index2.Bx0oGm8O.js","@astrojs/react/client.js":"_astro/client.MZBLJPEL.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/sanity/lib/_chunks-es/index3.mjs":"_astro/index3.NPVsRfRi.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/@sanity/vision/lib/_chunks-es/SanityVision.mjs":"_astro/SanityVision.DyKFyT6U.js","C:/Users/ADMIN/Documents/Web Project/IPGGhana/node_modules/@sanity/astro/dist/studio/studio-component":"_astro/studio-component.svaBHIKD.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts","const t=document.querySelector(\".nav-btn\"),n=document.querySelector(\".nav-list\"),l=document.querySelector(\".nav-overlay\"),r=document.querySelectorAll(\".nav-item\");let o=!1;t.addEventListener(\"click\",d);function d(){o?(t.classList.remove(\"close\"),n.classList.remove(\"show\"),t.classList.remove(\"show\"),l.classList.remove(\"show\"),r.forEach(e=>{e.classList.remove(\"show\")}),document.body.classList.remove(\"remove-scrolling\"),o=!1):(t.classList.add(\"close\"),n.classList.add(\"show\"),l.classList.add(\"show\"),r.forEach(e=>{e.classList.add(\"show\")}),document.body.classList.add(\"remove-scrolling\"),o=!0)}document.addEventListener(\"click\",e=>{const a=e.target.matches(\"[data-dropdown-button]\");if(!a&&e.target.closest(\"[data-dropdown]\")!=null)return;let s;a&&(s=e.target.closest(\"[data-dropdown]\"),s.classList.toggle(\"active\")),document.querySelectorAll(\"[data-dropdown].active\").forEach(c=>{c!==s&&c.classList.remove(\"active\")})});"],["C:/Users/ADMIN/Documents/Web Project/IPGGhana/src/components/CopyButton.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"share-button\"),t=document.getElementById(\"share-text\");if(!e||!t)return;const n=t.textContent;e.addEventListener(\"click\",o=>{o.preventDefault(),navigator.clipboard.writeText(window.location.href).then(()=>{t.textContent=\"Copied\",e.classList.add(\"copied\"),setTimeout(()=>{t.textContent=n,e.classList.remove(\"copied\")},3e3)}).catch(()=>{t.textContent=\"Error\",setTimeout(()=>{t.textContent=n},3e3)})})});"]],"assets":["/_astro/error-404.DO6zPUzb.png","/_astro/hero-bg.Blfgj9b0.jpg","/_astro/test-bg.BQAH3WcC.jpg","/_astro/about-img.DAod7F6Z.jpg","/_astro/logo-white.D0BH7lrV.svg","/_astro/logo-white.D_hgnVz6.png","/_astro/IMG_0152.JPG.B8-BTyDd.jpeg","/_astro/_slug_.BPazEoT7.css","/_astro/about.GqsPXZww.css","/img9.jpg","/favicons/favicon.svg","/uploads/1712938495012.jpeg","/uploads/angaza.jpg","/uploads/ciig-landscape.jpeg","/uploads/copy.jpeg","/uploads/image-0009.jpg","/uploads/image-0054.jpg","/uploads/img38.jpg","/uploads/img39.jpg","/uploads/img9.jpg","/uploads/imgd9.jpg","/uploads/learrn.png","/uploads/people-1.png","/_astro/browser._1PpzKwx.js","/_astro/client.CGF4QNZf.js","/_astro/client.MZBLJPEL.js","/_astro/index.ByfnXj3f.js","/_astro/index2.Bx0oGm8O.js","/_astro/index3.NPVsRfRi.js","/_astro/MainLayout.astro_astro_type_script_index_1_lang.DDCNxuYb.js","/_astro/refractor.BdAvBY-7.js","/_astro/resources.D3-rjlzv.js","/_astro/resources.DJU0_AX_.js","/_astro/resources2.D6hvydvy.js","/_astro/resources3.DfJHmhIH.js","/_astro/resources4.BSzzlzyt.js","/_astro/resources5.mRQpK8D-.js","/_astro/resources6.C8qUfVua.js","/_astro/SanityVision.DyKFyT6U.js","/_astro/stegaEncodeSourceMap.LmvMvrNn.js","/_astro/studio-component.C_AugudE.js","/_astro/studio-component.svaBHIKD.js","/_astro/ViteDevServerStopped.CyQy1hrE.js","/404.html","/about/index.html","/admin/index.html","/blog/index.html","/contact/index.html","/people/index.html","/privacy-policy/index.html","/publications/index.html","/terms-of-service/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"6WbN9k9pRAyW0VVgZeK6Xi3hu7HY9M5nmMbu1MgstJE=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\ADMIN\\Documents\\Web Project\\IPGGhana\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
