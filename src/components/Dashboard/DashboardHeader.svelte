<script>
	import { searchDate } from "@/services/stores";
</script>

<header>
	<h1>
		{new Date().getHours() < 12
			? "Buenos Dias"
			: new Date().getHours() < 18
				? "Buenas Tardes"
				: "Buenas Noches"}
	</h1>

	<label>
		Fecha:
		<input type="date" bind:value={$searchDate} /></label
	>
</header>

<style>
	header {
		background-color: var(--color);
		padding: 1rem;
		border-radius: var(--radius);
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	input[type="date"] {
		padding: 0.5rem;
		border-radius: var(--radius);
		border: 1px solid var(--accent);
		font-size: 1rem;
	}

	label {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 1.5rem;
	}
</style>
