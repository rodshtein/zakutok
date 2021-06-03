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

    init()
  })

  function init() {
    // getScript().onload = initCounter
  }

  function getScript() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src;

    document.body.appendChild(script)
    return script
  }

  function initCounter() {
    console.log('init Ya Metrika')

    window['yaCounter'+id] = new Ya.Metrika2({
      defer: true,
      id,
      clickmap,
      trackLinks,
      accurateTrackBounce,
      triggerEvent,
      webvisor
    });
  }
</script>