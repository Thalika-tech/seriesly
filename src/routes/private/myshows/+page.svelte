<script lang="ts">
	import Card from '$components/Card/Card.svelte';

</script>

<div class="layout">
	<h1 class="title">My Shows</h1>
		<div class="grid">
			<!-- {#each shows as show}
				<Card show={show}/>
			{/each} -->
		</div>
</div>

<style>
	.layout {
		padding: 1vw 4vw;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
  		gap: 24px; 
	}

	.title {
		margin-bottom: 24px;
	}
</style>
