<script lang="ts">
	import type { SvelteComponent } from "svelte";

	export let label: string;
	export let icon: string;
	export let href: string;
	export let className: string;
</script>

<li class={`${className}`}>
	<a {href}>
		{@html icon}
		<p>{label}</p>
	</a>
</li>

<style>
	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		padding: 0.5rem;
	}

	p {
		text-transform: capitalize;
	}

	.current-page {
		background-color: hsla(39.06, 100%, 50%, 0.2);
		outline: 2px solid hsl(39.06, 90%, 50%);
		border-radius: var(--radius);
		color: hsl(39.06, 90%, 50%);
	}

	a:hover {
		background-color: hsla(39.06, 100%, 50%, 0.2);
		outline: 2px solid hsl(39.06, 90%, 50%);
		border-radius: var(--radius);
		color: hsl(39.06, 90%, 50%);
	}
</style>
