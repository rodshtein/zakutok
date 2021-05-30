const path = require('path')

module.exports = function yandexMetrika (moduleOptions) {
  // Don't include on dev mode
  if (this.options.dev && process.env.NODE_ENV !== 'production') {
    return
  }

  const options = {
    useRuntimeConfig: this.options.publicRuntimeConfig ? 'yandexMetrika' : undefined,
    ...this.options.yandexMetrika,
    ...moduleOptions
  }

  const metrikaUrl = (options.useCDN ? 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch' : 'https://mc.yandex.ru/metrika') + '/tag.js' // add https://cdn.jsdelivr.net/npm/yandex-metrica-watch/watch.js

  options.metrikaUrl = metrikaUrl

  // Script preload
  this.options.head.link.push({
    href: metrikaUrl,
    rel: 'preload',
    as: 'script'
  })

  // Register plugin
  this.addPlugin({ src: path.resolve(__dirname, 'plugin.js'), ssr: false, options })
}

module.exports.meta = require('./package.json')



export default ({ app: { router }, $config }) => {

  const { useRuntimeConfig, metrikaUrl, ...options } = <%= JSON.stringify(options) %>
  if ($config && useRuntimeConfig) {
    Object.assign(options, $config[useRuntimeConfig])
  }
  const { id, ...metrikaOptions } = options

  let ready = false
  const basePath = (router.options.base || '/').replace(/\/$/, '')

  router.onReady(() => {
    // Mark when the router has completed the initial navigation.
    ready = true
  })

  function create() {

    if (!ready) {
      // Don't record a duplicate hit for the initial navigation.
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", metrikaUrl, "ym")

      ym(id, "init", metrikaOptions)
    }
    router.afterEach((to, from) => {
      ym(id, 'hit', basePath + to.fullPath, {
        referer: basePath + from.fullPath
        // TODO: pass title: <new page title>
        // This will need special handling because router.afterEach is called *before* DOM is updated.
      })
    })
  }

  if (window.ym === undefined) {
    create()
  }

}

/// defaults


(function (d, w, c) {

  (w[c] = w[c] || []).push(function() {
      try {
          w.yaCounter79779982 = new Ya.Metrika({
              defer: true,
              id:79779982,
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
          });
      } catch(e) { }
  });

  let n = d.getElementsByTagName("script")[0];
  let s = d.createElement("script");
  let f = function () { n.parentNode.insertBefore(s, n); };

  s.type = "text/javascript";
  s.async = true;
  s.src = "https://mc.yandex.ru/metrika/watch.js";

  if (w.opera == "[object Opera]") {
      d.addEventListener("DOMContentLoaded", f, false);
  } else { f(); }
})(document, window, "yandex_metrika_callbacks");