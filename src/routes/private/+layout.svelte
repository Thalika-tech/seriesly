<script lang="ts">
	let { children, data } = $props();
</script>

<div class="layout">
	{@render children()}
</div>

<style>
	.layout {
		padding: 1vw 4vw 2vw 4vw;
	}
</style>