<script lang="ts">
	interface CardProps {
		show: any;
	}

	import Icon from '@iconify/svelte';
	let { show }: CardProps = $props();
</script>

<a href="/">
	<div class="card">
		<img src={show.image.medium} alt="img" />
		<div class="title_div">
			<h4>{show.name}</h4>
			<button><Icon icon="icon-park-outline:like" width="24" height="24" class="icon"/></button>
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

	button {
		min-width: 24px;
		background-color: transparent;
		border: none;
		color: white;
	}
</style>
