<script>
	import { generateReportByDateService } from "@/services/sales";
	import { onMount } from "svelte";

	function closeGenerateReportDialog() {
		document.getElementById("generateReportDialog").close();
	}

	async function generateReport() {
		generateReportByDateService(startDate, endDate);
	}

	// Start date in the first day of the current month
	let startDate = new Date().toISOString().split("T")[0];
	startDate = startDate.slice(0, startDate.length - 2) + "01";

	// End date in the current date
	let endDate = new Date().toISOString().split("T")[0];
</script>

<dialog id="generateReportDialog">
	<div>
		<h1>Generar Reporte</h1>
		<span
			class="close"
			on:click={() => closeGenerateReportDialog()}
			on:keydown={(e) => e.key === "Escape" && closeGenerateReportDialog()}
			tabindex="0"
			role="button"
			aria-label="Close dialog">&times;</span
		>
		<form
			on:submit|preventDefault={() => {
				generateReport();
			}}
		>
			<label for="startDate">Fecha de Inicio</label>
			<input
				type="date"
				id="startDate"
				name="startDate"
				required
				bind:value={startDate}
			/>

			<label for="endDate">Fecha de Fin</label>
			<input
				type="date"
				id="endDate"
				name="endDate"
				required
				bind:value={endDate}
			/>

			<button type="submit">Generar</button>
		</form>
	</div>
</dialog>

<style>
	dialog {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	div {
		padding: 1rem;
		width: 30rem;
	}

	h1 {
		margin-bottom: 1rem;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		font-size: 1.2rem;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	input {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: var(--radius);
	}

	span.close {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		cursor: pointer;
		z-index: 5;
		font-size: 1.5rem;
	}

	span.close:hover {
		color: red;
	}

	button {
		padding: 0.5rem 1rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 1.2rem;
		margin-top: 1rem;
	}
</style>
