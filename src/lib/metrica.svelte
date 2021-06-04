<script context="module">
  let initialized = false;

  export function init(baseUrl) {
    if(initialized) return;

    initialized = true;
    run()
    return;
    // Init ym function
    // Check for already func init in app.html or by GTM
    window.ym = window.ym || function(){
      window.ym.a = window.ym.a || []
      window.ym.a.push(arguments)
    };

    window.ym.l = 1 * new Date();

    // Get Y.Metrica script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = baseUrl;
    document.head.append(script)
  }

  function run(){
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(79779982, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
  }
</script>

<script>
  import { onMount } from 'svelte'
  // import { dev } from '$app/env';
  let dev = false;

  export let scriptURL = null;
  export let useCDN = false;
  export let id = null;
  export let options = {};

  const urls = {
    def: 'https://mc.yandex.ru/metrika/tag.js',
    cdn: 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js'
  }

  const baseUrl = scriptURL || useCDN
      ? scriptURL
        ? scriptURL
        : urls.cdn
      : urls.def;

  const defaultOptions = {
    trackLinks : true,
    accurateTrackBounce : true,
    triggerEvent :true,
    clickmap : false,
    webvisor : false,
  };

  onMount(()=>{
    if(!dev || id){
      document.addEventListener( `yacounter${id}inited`,
      () => console.log(`счетчик yaCounter${id} можно использовать`));

      init(baseUrl)

      // ym(id, "init", Object.assign(defaultOptions, options));
    }
  })

</script>