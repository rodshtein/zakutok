<script >
  import { onMount } from 'svelte'

  const DEV = import.meta.env.VITE_DEV ? true : false;

  export let id = null;
  export let clickmap = true
  export let trackLinks = true
  export let accurateTrackBounce = true
  export let src = "https://mc.yandex.ru/metrika/watch.js"

  onMount(() => {
    if (!DEV || !id) return
    init()
  })

  function init() {
    getScript().onload = initCounter
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
    window['yaCounter'+id] = new Ya.Metrika({
      defer: true,
      id,
      clickmap,
      trackLinks,
      accurateTrackBounce
    });
  }
</script>