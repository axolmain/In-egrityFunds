/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-c008c882'], (function (workbox) { 'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "/_next/server/app/_not-found/page_client-reference-manifest.js",
    "revision": "667e461c88680c495b5a3924ba0b8413"
  }, {
    "url": "/_next/server/middleware-build-manifest.js",
    "revision": "bbc5b5443a06ed383d19c7d003e8bd5f"
  }, {
    "url": "/_next/server/middleware-react-loadable-manifest.js",
    "revision": "537157e425123611736ddcf544160221"
  }, {
    "url": "/_next/server/next-font-manifest.js",
    "revision": "122a6cb07a9553fb9e626f221727eb83"
  }, {
    "url": "/_next/static/chunks/app-pages-internals.js",
    "revision": "5a2c1b40379cda8600f4148e847b6b0f"
  }, {
    "url": "/_next/static/chunks/app/_not-found/page.js",
    "revision": "6e3c04af6a9a1004bbc2b0d1afbaf406"
  }, {
    "url": "/_next/static/chunks/main-app.js",
    "revision": "7b84e50516f9fbbbbee93b9ea8e6d2e4"
  }, {
    "url": "/_next/static/chunks/polyfills.js",
    "revision": "846118c33b2c0e922d7b3a7676f81f6f"
  }, {
    "url": "/_next/static/chunks/webpack.js",
    "revision": "e5624bda2d9454f58cdee9279be3afcd"
  }, {
    "url": "/_next/static/css/app/layout.css",
    "revision": "1a14e464416e49c678c595432b9c7396"
  }, {
    "url": "/_next/static/development/_buildManifest.js",
    "revision": "ffa3aabb229020bfdacb6f27acadcf31"
  }, {
    "url": "/_next/static/development/_ssgManifest.js",
    "revision": "abee47769bf307639ace4945f9cfd4ff"
  }, {
    "url": "/_next/static/media/26a46d62cd723877-s.woff2",
    "revision": "befd9c0fdfa3d8a645d5f95717ed6420"
  }, {
    "url": "/_next/static/media/55c55f0601d81cf3-s.woff2",
    "revision": "43828e14271c77b87e3ed582dbff9f74"
  }, {
    "url": "/_next/static/media/581909926a08bbc8-s.woff2",
    "revision": "f0b86e7c24f455280b8df606b89af891"
  }, {
    "url": "/_next/static/media/6d93bde91c0c2823-s.woff2",
    "revision": "621a07228c8ccbfd647918f1021b4868"
  }, {
    "url": "/_next/static/media/97e0cb1ae144a2a9-s.woff2",
    "revision": "e360c61c5bd8d90639fd4503c829c2dc"
  }, {
    "url": "/_next/static/media/a34f9d1faa5f3315-s.p.woff2",
    "revision": "d4fe31e6a2aebc06b8d6e558c9141119"
  }, {
    "url": "/_next/static/media/df0a9ae256c0569c-s.woff2",
    "revision": "d54db44de5ccb18886ece2fda72bdfe0"
  }, {
    "url": "/_next/static/webpack/webpack.894d0aad75938a3d.hot-update.js",
    "revision": "development"
  }], {
    "ignoreURLParametersMatching": [/ts/]
  });
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }
        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
