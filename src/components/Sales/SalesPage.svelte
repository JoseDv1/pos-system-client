<script>
	import SalesTable from "./SalesTable.svelte";
	import SalesHeader from "./SalesHeader.svelte";
	import SalesFooter from "./SalesFooter.svelte";
	import GenerateReportDialog from "./GenerateReportDialog.svelte";
</script>

<main>
	<SalesHeader />
	<SalesTable />
	<SalesFooter />
	<GenerateReportDialog />
</main>

<style>
	main {
		padding: 2rem;
	}
</style>
