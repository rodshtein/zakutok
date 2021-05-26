<script>
	import { page, navigating } from '$app/stores';
	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../styles/app.css';
	import Nav from '$lib/Nav.svelte';

	$: section = $page.path.split('/')[1];
</script>


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
