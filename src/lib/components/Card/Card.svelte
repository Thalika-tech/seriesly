<script lang="ts">
	import { page } from '$app/stores';
  	import LikeBtn from '$components/Button/LikeBtn.svelte';

	let currentUrl = $page.url.href;
	let activePage = $state(currentUrl.slice(currentUrl.lastIndexOf("/")+1, currentUrl.length))

	interface CardProps {
		show: any;
	}
	
	let { show }: CardProps = $props();
</script>

<a href={`/private/${show.show_id === undefined ? show.id: show.show_id}?from=${activePage}`}>
	<div class="card">
		<img src={show.image.medium === undefined ? show.image : show.image.medium } alt="img" />
		<div class="title_div">
			<h4>{show.name}</h4>
			<LikeBtn condition={show.fav} show={show} size="24"/>
		</div>
	</div>
</a>

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
</style>
