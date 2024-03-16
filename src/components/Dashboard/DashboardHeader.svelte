<header>
	<h1>
		{new Date().getHours() < 12
			? "Buenos Dias"
			: new Date().getHours() < 18
				? "Buenas Tardes"
				: "Buenas Noches"}
	</h1>
	<p>Aqui tienes los resumenes de hoy</p>
</header>

<style>
	header {
		background-color: var(--color);
		padding: 1rem;
		border-radius: var(--radius);
		margin-bottom: 1rem;
	}
</style>
