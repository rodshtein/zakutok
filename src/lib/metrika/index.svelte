<script>
  import { tagConstructor } from './metrika1.js'
  import { onMount } from 'svelte'
  import { dev } from '$app/env';
  //let dev = false;

  export let async = true;
  export let scriptURL = null;
  export let useCDN = false;
  export let options = [];

  // convert object to array
  options = Array.isArray(options) ? options : [options];

  let validOptions = options.filter(item => item.id).length === options.length;

  if(!validOptions) console.info("[Y.Metrika] Can't find all YM ID's! Check options")


  onMount(()=>{
    if(!dev || validOptions){
      // document.addEventListener( `yacounter${id}inited`,
      // () => console.log(`счетчик yaCounter${id} можно использовать`));
    }
  })

</script>

<svelte:head>
  {#if validOptions}
    {@html tagConstructor({async, scriptURL, useCDN, options})}
  {/if}
</svelte:head>