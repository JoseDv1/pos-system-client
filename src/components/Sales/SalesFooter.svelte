<script>
	import reportIcon from "@/assets/svgs/bx-receipt.svg?raw";
</script>

<footer>
	<button
		class="btn-edit"
		on:click|preventDefault={(e) => {
			document.getElementById("generateReportDialog").showModal();
		}}
	>
		{@html reportIcon}
		Generar Reporte
	</button>
</footer>

<style>
	footer {
		display: flex;
		gap: 1rem;
		background-color: var(--accent);
		padding: 1rem;
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
