<script>
	import { parseId, parseIsoDate } from "@/services/utils";
	import { productsOnSale, printSale } from "@/services/productsOnSale";
	import { markSaleAsPaidService } from "@/services/sales";

	import PlusIcon from "@/assets/svgs/bx-plus.svg?raw";

	function openAddProductOnSaleDialog() {
		const dialog = document.getElementById("add-product-on-sale-dialog");
		dialog.showModal();
	}
</script>

<header>
	<section>
		<h1>
			Productos en la venta <span>#{parseId($productsOnSale?.id)}</span>
		</h1>

		<div>
			<button
				class="btn-success"
				on:click={() => {
					const isConfirmed = confirm("Deseas marcar esta venta como pagada?");
					if (!isConfirmed) return;
					markSaleAsPaidService($productsOnSale.id);

					const isPrintReceipt = confirm("Deseas imprimir el recibo?");
					if (isPrintReceipt) {
						printSale($productsOnSale);
					}

					$productsOnSale.status = "PAID";
				}}
			>
				<box-icon name="money-withdraw" color="currentColor"></box-icon>
				Marcar como pagada</button
			>
			<button class="btn-edit" on:click={() => printSale($productsOnSale)}>
				<box-icon name="printer" color="currentColor"></box-icon>
				Imprimir</button
			>
			<button class="btn-edit" on:click={() => openAddProductOnSaleDialog()}>
				{@html PlusIcon}
				Agregar Productos</button
			>
		</div>
	</section>
	<footer>
		<span><b>Mesero/a: </b> {$productsOnSale?.client?.name}</span>
		<span><b>Fecha: </b> {parseIsoDate($productsOnSale?.createdAt)}</span>
		<span
			><b>Total: </b>
			{new Intl.NumberFormat("es-CO", {
				style: "currency",
				currency: "COP",
			}).format($productsOnSale?.totalCost)}</span
		>
		<span class={$productsOnSale?.status === "PENDING" ? "pending" : "pay"}
			><b>Estado: </b>
			{$productsOnSale?.status === "PENDING" ? "Pendiente" : "Pagado"}</span
		>
	</footer>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		align-items: space-between;
		justify-content: center;
		background-color: white;
		padding: 1rem;
		border-radius: var(--radius);
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	header section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	header section div {
		display: flex;
		gap: 0.5rem;
	}

	header footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
