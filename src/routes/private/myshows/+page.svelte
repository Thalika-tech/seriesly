<script lang="ts">
	import Card from '$components/Card/Card.svelte';
  	import { getUserState } from '$lib/state/user-state.svelte';

	let userContext = getUserState();
	let { userShows } = $derived(userContext);

	$inspect(userShows)
</script>


<h1 class="title">My Shows</h1>
	{#if userShows.length > 0}
		<div class="grid">
			{#each userShows as show}
				<Card show={show} />
			{/each}
		</div>
	{:else}
		<h1 class="none_title">There’s nothing here... yet!</h1>
		<p>Explore and add shows to build your collection <a href="/private/allshows">now!</a></p>
	{/if}
<style>

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 32px; 
		justify-items: center;
	}

	.title {
		margin-bottom: 24px;
	}

	p {
		font-size: 24px;
	}

	.none_title {
		font-size: 40px;
		margin: 8px 0px
	}

	a {
		color: #007AFF;
	}
</style>
