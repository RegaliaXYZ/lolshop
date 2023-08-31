<script>
	export let data;
  	let selectedItem = 0;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container">
	<div class="parts" id="child1">

	</div>

	<div class="parts" id="child2">
		{#each data.items as item, index (item.name)}
		<button class="item" on:click={() => {
			selectedItem = index
		}} >
			<img src={item.image.full} alt={item.name} width=24 height=24 />
		</button>
		{/each}

	</div>
	
	<div class="parts" id="child3">
		{#if data.items[selectedItem]}
		<div class="itemCard">

			<h1>{data.items[selectedItem].name}</h1>
			<img src={data.items[selectedItem].image.full} alt={data.items[selectedItem].name} width=64 height=64 />
			<div class="itemCardDescription">
				{@html data.items[selectedItem].description}
			</div>
		</div>
		{/if}

	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 100vh;
	}

	.itemCard {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.itemCardDescription {
		width: 90%;
	}
	.item {
		width: 36px;
		height: 36px;
	}

	.parts {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	#child2 {
		border-left: hsla(0,0%,100%,0.2) solid 1px;
		border-right: hsla(0,0%,100%,0.2) solid 1px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
