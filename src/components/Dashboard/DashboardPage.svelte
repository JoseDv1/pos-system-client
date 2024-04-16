<script lang="ts">
	import DashboardSalesResume from "./DashboardSalesResume.svelte";
	import DashboardSalesByClient from "./DashboardSalesByClient.svelte";
	import DashboardHeader from "./DashboardHeader.svelte";
	import DashboardSuppliesResume from "./DashboardSuppliesResume.svelte";
	import DashboardResumeSection from "./DashboardResumeSection.svelte";
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
		<DashboardSuppliesResume />
		<DashboardSalesByClient />
		<DashboardResumeSection />
	</section>
</main>

<style>
	main {
		padding: 1rem 2rem;
	}

	main > section {
		border-radius: var(--radius);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;

		& > * {
			background-color: var(--color);
			padding: 1rem;
			border-radius: var(--radius);
			width: 100%;
		}
	}
</style>
