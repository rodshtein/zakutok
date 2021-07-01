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

	onMount(() => initMetrika({options:{id:79779982}}));

</script>

<!-- <Metrika  options={{id:79779982}}/> -->

<!-- <Nav {section}/> -->

{#if $navigating}
	<PreloadingIndicator/>
{/if}

<svelte:head>
	<meta name="description" content="Подкастерск­ий за­кут­ок нера­внод­ушн­ых реб­ят из Вла­дивос­тока. Неко­ммерче­ский прое­кт гру­ппы компа­ний Kokovikhin.Digital">
	<meta property="og:url" content="https://zakutok.media">
	<meta property="og:title" content="Подкастерск­ий за­кут­ок нера­внод­ушн­ых реб­ят из Вла­дивос­тока.">
	<meta property="og:description" content="Неко­ммерче­ский прое­кт гру­ппы компа­ний Kokovikhin.Digital">
	<meta property="og:type" content="website">
	<meta property="og:image:type" content="png">
	<meta property="og:image" content="/logo.png">
</svelte:head>

<main>
	<slot />
</main>

<footer>
	<Footer/>
</footer>


<style>
</style>
