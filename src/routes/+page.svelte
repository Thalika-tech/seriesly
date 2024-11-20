<script>
	import Button from '$lib/components/Button/+Button.svelte';
</script>

<h1 class="title">Take Your Series Seriously</h1>
<p class="subtitle">
	Favorite the shows you love, stay updated on new episodes, and track your progress with ease.
	Discover your next binge-worthy obsession today!
</p>

<div class="buttons_div">
	<Button href="/login">Log In</Button>
	<Button href="/login" isSecondary={true}>Sign Up</Button>
</div>

<style>
	.buttons_div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		font-size: 72px;
		text-align: right;
	}

	.subtitle {
		font-size: 24px;
		text-align: right;
	}
</style>
