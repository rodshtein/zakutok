<script>
	import { page, navigating } from '$app/stores';
	import { onMount } from 'svelte';
	// import Metrika from '$lib/metrika/index.svelte';
	import { initMetrika } from '$lib/metrika/metrika1.js';
	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../styles/app.css';
	import Nav from '$lib/Nav.svelte';

	$: section = $page.path.split('/')[1];

	onMount(() => initMetrika({lazy:true, options:{id:79779982}}));

</script>

<!-- <Metrika  options={{id:79779982}}/> -->

<!-- <Nav {section}/> -->

{#if $navigating}
	<PreloadingIndicator/>
{/if}

<main>
	<slot />
</main>

<footer>
	<Footer/>
</footer>


<style>
</style>
