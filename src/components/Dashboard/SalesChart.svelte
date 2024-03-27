<script>
	import { Chart } from "chart.js";
	import { onMount } from "svelte";

	let canvas;

	onMount(() => {
		const ctx = canvas.getContext("2d");

		new Chart(ctx, {
			type: "line",
			data: {
				labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
				datasets: [
					{
						label: "Ventas",
						data: [65, 59, 80, 81, 56, 55],
						fill: false,
						borderColor: "rgb(75, 192, 192)",
						tension: 0.1,
					},
				],
			},
		});
	});
</script>

<canvas bind:this={canvas}> </canvas>
