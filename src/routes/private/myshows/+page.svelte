<script lang="ts">
	import Card from '$components/Card/Card.svelte';
  	import { getUserState } from '$lib/state/user-state.svelte';

	let userContext = getUserState();
	let { userShows } = $derived(userContext);

	$inspect(userShows)
</script>

<div class="layout">
	<h1 class="title">My Shows</h1>
		<div class="grid">
			{#if userShows.length > 0}
				{#each userShows as show}
					<Card show={show} />
				{/each}

			{:else}
				<p>No Shows Added</p>
			{/if}
		</div>
</div>

<style>
	.layout {
		padding: 1vw 4vw;
	}

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
</style>
