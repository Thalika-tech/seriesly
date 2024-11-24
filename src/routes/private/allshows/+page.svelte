<script lang="ts">
	import Card from '$components/Card/Card.svelte';
  	import Search from '$components/Search/Search.svelte';
  	import { getUserState } from '$lib/state/user-state.svelte.js';

  	let userContext = getUserState();
  	let { userShows } = $derived(userContext);

	let { data } = $props(); 
	let { shows } = data;  
	let filteredShows = $state(shows);
	
	$effect(() => {
		filteredShows.map((show: any) => {
			let isUpdated = false;

			userShows.map((userShow) => {
				if (userShow.show_id == show.id) {
					show.fav = true;
					isUpdated = true;
				}
			});

			if (!isUpdated && show.fav) {
				filteredShows = filteredShows.map((allShow: any) =>
					(allShow.id).toString() == show.id ? { ...allShow, fav: false } : allShow
				);
			}
		});

	
		$inspect(filteredShows)
	})

	let inputValue = $state("");

	const handleChange = (event: any) => {
		inputValue = event.target.value;
		filteredShows = shows.filter((show: any) => show.name.toLowerCase().includes(inputValue.toLowerCase()));
	};
</script>


<div class="title_div">
	<h1>All Shows</h1> 	
	<Search inputValue={inputValue} handleChange={handleChange} />
</div>

<div class="grid">
	{#each filteredShows as show}
		<Card show={show}/>
	{/each}
</div>


<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 32px; 
		justify-items: center;
	}

	.title_div {
		display: flex;
		margin-bottom: 32px;
	}
</style>
