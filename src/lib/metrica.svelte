<script >
  import { onMount } from 'svelte'
  import { dev } from '$app/env';

  export let id = null;
  export let clickmap = true
  export let trackLinks = true
  export let accurateTrackBounce = true
  export let triggerEvent = true
  export let webvisor = false
  export let src = "https://mc.yandex.ru/metrika/tag.js"

  onMount(() => {
    if (dev || !id) return

    document.addEventListener( `yacounter${id}inited`,
    () => console.log(`счетчик yaCounter${id} можно использовать`));

    // init()
  })


  function init() {
    window.ym = window.ym || function () {
      (window.ym.a = window.ym.a || []).push(arguments)
   };

   window.ym.l = 1 * new Date();


    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src;

    document.body.appendChild(script)

    ym(id, "init", {
      defer: true,
      clickmap,
      trackLinks,
      accurateTrackBounce,
      triggerEvent,
      webvisor
    });
  }
</script>