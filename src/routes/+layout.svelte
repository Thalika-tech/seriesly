<script lang="ts">
	import './../app.css';

	let { children, data } = $props();
</script>

<div class="layout">
	{@render children()}
</div>

<style>
	.layout {
		margin: 4vw;
	}
</style>
