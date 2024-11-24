<script lang="ts">
    import { getUserState } from '$lib/state/user-state.svelte';
    import Icon from '@iconify/svelte';

	interface ButtonProps {
        condition: boolean
        show: any;
        size: string;
	}

	let {condition, show, size }: ButtonProps = $props();
    let userContext = getUserState();

    // Add or remove show to your list
	const handleLikeClick = (event: any, show: any) => {
		event.preventDefault();
		event.stopPropagation();

		if(show.fav){
			userContext.removeShow(show)
		}else{
			userContext.addShows(show);
		}
	}
</script>

<button onclick={(e) => handleLikeClick(e, show)}>
    {#if condition}
        <Icon icon="icon-park-solid:like" width={size} height={size} color="#ec644b"/>
    {:else} 
        <Icon icon="icon-park-outline:like" width={size} height={size} />
    {/if}
</button>


<style>
	  button {
		min-width: 32px;
		background-color: transparent;
		border: none;
		color: white;
		cursor: pointer;
		&:hover{
			transform: scale(1.05);
		}
	}
</style>
