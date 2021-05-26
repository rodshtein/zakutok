<script>
	export let section;
</script>

<nav>
	<a sveltekit:prefetch href="/" class:selected={section === "top"}>ZAKUTOK.MEDIA</a>

	<ul>
		<li><a sveltekit:prefetch href="/smarketing/" class:selected={section === "top"}>Шмаркетинг</a></li>
		<li><a sveltekit:prefetch href="/gosuch/" class:selected={section === "new"}>Gosuch</a></li>
		<li><a sveltekit:prefetch href="/5cents/" class:selected={section === "show"}>Пятицентовая поэзия</a></li>
	</ul>
</nav>

<style>
	nav {
		/* background-color: rgba(255, 102, 0, 0.05); */
		border-bottom: 1px solid #ff6600;
		color: var(--fg-light);
		font-weight: 300;
		padding: 0 1em;
	}
	ul {
		margin: 0;
		padding: 0;
	}
	ul::after {
		content: '';
		display: block;
		clear: both;
	}
	li {
		display: block;
		float: left;
	}
	.selected {
		position: relative;
		display: inline-block;
		color: var(--fg);
	}
	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: #ff6600;
		display: block;
		bottom: 0;
	}
	a {
		color: inherit;
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		font-weight: 500;
	}
	@media (min-width: 400px) {
		li {
			display: inline-block;
		}
	}
</style>