<script>
	import { page, navigating } from '$app/stores';
	import Metrica from '$lib/metrica2.svelte';
	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../styles/app.css';
	import Nav from '$lib/Nav.svelte';

	$: section = $page.path.split('/')[1];

</script>

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
