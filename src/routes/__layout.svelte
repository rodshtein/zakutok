<script>
	import { onMount } from 'svelte'
	import { page, navigating } from '$app/stores';
	import Metrica from '$lib/metrica2.svelte';
	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../styles/app.css';
	import Nav from '$lib/Nav.svelte';

	$: section = $page.path.split('/')[1];
	onMount(()=>{
		(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
		m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
		(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

		ym(79779982, "init", {
			clickmap:true,
			trackLinks:true,
			accurateTrackBounce:true
		});
	})
</script>

<!-- <Metrica/> -->

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
