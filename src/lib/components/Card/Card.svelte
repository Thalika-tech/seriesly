<script lang="ts">
	import { getUserState } from '$lib/state/user-state.svelte';
	import Icon from '@iconify/svelte';

	interface CardProps {
		show: any;
		remove?: (show: any) => void;
	}
	
	let { show, remove }: CardProps = $props();
	let userContext = getUserState();


	// Add or remove show to your list
	const handleLikeClick = (event: any, show: any) => {
		event.preventDefault();
		event.stopPropagation();

		if(show.image.medium === undefined){
			async () => {
				await userContext.removeShow(show).then(() => {
					if(remove){
						remove(show);
					}
				})
			}
		}else{
			userContext.addShows(show);
		}
	}
</script>

<!-- <a href={`/private/${show.id}`}> -->
	<div class="card">
		<img src={show.image.medium === undefined ? show.image : show.image.medium } alt="img" />
		<div class="title_div">
			<h4>{show.name}</h4>
			<button onclick={(e) => handleLikeClick(e, show)}>
				{#if show.image.medium === undefined}
					<Icon icon="icon-park-solid:like" width="24" height="24" color="#ec644b"/>
				{:else} 
					<Icon icon="icon-park-outline:like" width="24" height="24" />
				{/if}
			</button>
		</div>
	</div>
<!-- </a> -->

<style>
	.card {
		background-color: #2a2a2d;
		width: 200px;
		border-radius: 8px;
		height: 100%;
	}

	.title_div {
		padding: 8px 16px 16px 16px;
		display: flex;
  		padding: 16px; 
	}

	img {
		width: 200px;
	}

	h4 {
		margin: auto auto auto 0px;
		font-weight: 400;
		padding: 0px 16px 0px 0px;
		height: 100%;
	}

	button {
		min-width: 24px;
		background-color: transparent;
		border: none;
		color: white;
		cursor: pointer;
		&:hover{
			transform: scale(1.05);
		}
	}

</style>
