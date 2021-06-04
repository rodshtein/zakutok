<script context="module">
  let initialized = false;

  export function init(baseUrl) {
    if(initialized) return;

    initialized = true;

    setMetrika(window, document, "script", baseUrl, "ym");
  }

  function setMetrika(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){
      (m[i].a=m[i].a||[]).push(arguments)
    };
    m[i].l=1*new Date();
    k=e.createElement(t),
    a=e.getElementsByTagName(t)[0],
    k.async=1,
    k.src=r,
    a.parentNode.insertBefore(k,a)
  }
</script>

<script>
  import { onMount } from 'svelte'
  import { dev } from '$app/env';
  //let dev = false;

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

      ym(id, "init", Object.assign(defaultOptions, options));
    }
  })

</script>