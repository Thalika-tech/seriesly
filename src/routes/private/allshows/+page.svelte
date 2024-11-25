<script lang="ts">
	import Card from '$components/Card/Card.svelte';
  	import Search from '$components/Search/Search.svelte';
  	import { getUserState } from '$lib/state/user-state.svelte.js';

  	let userContext = getUserState();
  	let { userShows } = $derived(userContext);

	let { data } = $props(); 
	let { shows } = data;  
	
	let filteredShows = $state(shows);
	let allGenres: string[] = [];
	let selectedGenre = $state("All");

	// svelte-ignore state_referenced_locally
	filteredShows.map((show: any) => {
		show.genres.forEach((genre: string) => {
			if (!allGenres.includes(genre)) {
				allGenres.push(genre);
			}
		})
	});

	allGenres.sort((a, b) => a.localeCompare(b));
	allGenres.unshift("All");

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
	})

	let inputValue = $state("");

	const handleChange = (event: any) => {
		inputValue = event.target.value;
		filteredShows = shows.filter((show: any) => show.name.toLowerCase().includes(inputValue.toLowerCase()));
	};

	const changeGenre = (genre: string) => {
		selectedGenre = genre;

		if(genre === "All"){
			filteredShows = shows;
		}else{
			filteredShows = shows.filter((show: any) => show.genres.includes(genre));
		}
	}
</script>


<div class="title_div">
	<h1>All Shows</h1> 	
	<Search inputValue={inputValue} handleChange={handleChange} />
</div>

<div class="genre_div">
	{#each allGenres.slice(0, 10) as genre}
		<button onclick={() => changeGenre(genre)} class="filter" class:selectedGenre={selectedGenre === genre} >{genre}</button>
	{/each}

	<!-- <button>Filter</button> -->
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

	.genre_div{
		display: flex;
		overflow-x: hidden;
		margin-bottom: 32px;
		
	}

	.filter{
		font-size: 20px;
		margin: 0px 24px 16px 0px;
		white-space: nowrap;
	}

	.selectedGenre{
		font-weight: bold;
	}

	button {
		background-color: transparent;
		border: none;
		color: white;
		cursor: pointer;
	}
</style>
