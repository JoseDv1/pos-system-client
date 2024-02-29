<script lang="ts">
	import ClientsHeader from "./ClientsHeader.svelte";
	import ClientsTable from "./ClientsTable.svelte";
	import ClientsDialogs from "./ClientsDialogs.svelte";
</script>

<main>
	<ClientsHeader />
	<ClientsTable />
	<ClientsDialogs />
</main>

<style>
	main {
		padding: 1rem 2rem;
	}
</style>
