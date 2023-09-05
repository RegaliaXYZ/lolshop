<script>
	export let data;
	
	// make computed items list
	$: filteredItems = data.items;
  	let selectedItem = "";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container">
	<div class="parts" id="child1">
		{#each data.filters as filter, index (filter)}
			<div class="filter">
				<p>{filter.header}</p>
				{#each filter.tags as tag, index (tag)}
					<button on:click={() => {
						console.log(filteredItems, data.items);
						filteredItems = data.items.filter((item) => {
							for (let itemtag of item.tags) {
								if (tag.toUpperCase() == itemtag.toUpperCase()) {
									return true;
								}
							}
						});
					}} >{tag}</button>
				{/each}
				
			</div>
		{/each}
	</div>

	<div class="parts" id="child2">
		{#each filteredItems as item, index (item.name)}
			<div class="image-button">
				<img src={item.image.full} alt={item.name} />
				<button on:click={() => selectedItem = item.id}></button>
			</div>

		{/each}

	</div>
	
	<div class="parts" id="child3">
		{#each data.items as object, index (object)}
			{#if object.id == selectedItem}
				{#if object.from}
					<div class="itemBuild">
						<p>Builds From</p>
						{#each object.from as item, index (item)}
							<img src={"http://ddragon.leagueoflegends.com/cdn/" + data.patch + "/img/item/" + object.from[index] + ".png"} alt="item from" />
						{/each}
					</div>
				{/if}
				{#if object.into}
					<div class="itemBuild">
						<p>Builds into</p>
						{#each object.into as item, index (item)}
							<img src={"http://ddragon.leagueoflegends.com/cdn/" + data.patch + "/img/item/" + object.into[index] + ".png"} alt="item from" />
						{/each}
					</div>
				{/if}
			<div class="itemCard">

				<h1>{object.name}</h1>
				<img src={object.image.full} alt={object.name} width=64 height=64 />
				<div class="itemCardDescription">
					{@html object.description}
				</div>
			</div>
		{/if}
		{/each}
	</div>
</div>

<style>
	.image-button {
		position: relative;
		display: inline-block;
		width: 48px;
		height: 48px;
	}

	.image-button img {
		display: block;
		width: 100%; /* Ensure the image takes up the full width of the container */
		height: auto; /* Maintain the aspect ratio */
	}

	.image-button button {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0; /* Make the button invisible */
		cursor: pointer;
	}


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

	.parts {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	#child1 {
		border-right: hsla(0,0%,100%,0.2) solid 1px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#child2 {
		border-left: hsla(0,0%,100%,0.2) solid 1px;
		border-right: hsla(0,0%,100%,0.2) solid 1px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0 1rem;
	}

	#child3 {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
