<script lang="ts">
	import DashboardSalesResume from "./DashboardSalesResume.svelte";
	import DashboardSalesByClient from "./DashboardSalesByClient.svelte";
	import DashboardHeader from "./DashboardHeader.svelte";
	import { onMount } from "svelte";
	import { clientsFilter } from "@/services/sales";
	import { searchDate } from "@/services/stores";

	onMount(() => {
		searchDate.set(new Date().toISOString().split("T")[0]);
		clientsFilter.set("");
	});
</script>

<main>
	<DashboardHeader />

	<section>
		<DashboardSalesResume />
		<DashboardSalesByClient />
	</section>
</main>

<style>
	main {
		padding: 1rem 2rem;
	}

	main > section {
		border-radius: var(--radius);
		display: flex;
		justify-content: start;
		align-items: stretch;
		gap: 1rem;

		& > * {
			flex: 1;
		}
	}
</style>
