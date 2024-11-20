<script lang="ts">
	import './../app.css';
	import Logo from '$assets/logo.png';
	import Placeholder from '$assets/placeholder.png';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { children, data } = $props();
	let { session, supabase, user } = $derived(data);

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div style="display: flex">
	<img src={Placeholder} alt="img" class="main_img" />
	<div class="right_section">
		<div class="logo">
			<a href="/">
				<img src={Logo} alt="logo" />
			</a>
		</div>

		{@render children()}
	</div>
</div>

<style>
	.main_img {
		height: 100vh;
	}

	.right_section {
		padding: 80px 120px 0px 120px;
		width: 100%;
	}

	.logo {
		text-align: right;
	}
</style>
