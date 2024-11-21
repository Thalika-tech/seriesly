<script lang="ts">
  import Button from '$components/Button/Button.svelte';

</script>
<h1 class="title">Take Your <br /> Series Seriously</h1>

<p class="subtitle">
	Favorite the shows you love, stay updated on new episodes, and track your progress with ease.
	<br />Discover your next binge-worthy obsession today!
</p>

<ul>
	<li>
		<Button href="/login">Log In</Button>
	</li>
	<li>
		<Button href="/register" isSecondary={true}>Sign Up</Button>
	</li>
</ul>

<style>
	.title {
		font-size: 72px;
		text-align: right;
		margin: 88px 0px 40px 0px;
		line-height: 100%;
	}

	.subtitle {
		font-size: 22px;
		text-align: right;
		float: right;
		margin-bottom: 40px;
	}

	ul {
		display: flex;
		column-gap: 24px;
		float: right;
	}
</style>
