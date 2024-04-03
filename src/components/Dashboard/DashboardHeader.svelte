<script>
</script>

<header>
	<header>
		<h1>
			{new Date().getHours() < 12
				? "Buenos Dias"
				: new Date().getHours() < 18
					? "Buenas Tardes"
					: "Buenas Noches"}
		</h1>
	</header>

	<footer>
		<p>Aqui tienes los resumenes de hoy</p>
	</footer>
</header>

<style>
	header:not(header > header) {
		background-color: var(--color);
		padding: 1rem;
		border-radius: var(--radius);
		margin-bottom: 1rem;
	}

	header > header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: larger;
	}
</style>
