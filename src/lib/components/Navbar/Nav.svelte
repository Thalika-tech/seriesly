<script lang="ts">
	import Logo from '$assets/logo.png';
	import Icon from '@iconify/svelte';

	import { getUserState } from '$lib/state/user-state.svelte';
	let userContext = getUserState();
	// let { user } = $derived(userContext);
</script>

<nav>
	<a href="/">
		<img src={Logo} alt="logo" />
	</a>
	<ul>
		<li><a href="/private/dashboard">My Shows</a></li>
		<li><a href="/private/dashboard">All Shows</a></li>
		<li><a href="/private/dashboard">New & Popular</a></li>
	</ul>
	<!-- <p>{user?.email}</p> -->
	<button onclick={() => userContext.logout()}
	><Icon icon="material-symbols:logout-rounded" width="32" height="32" /></button>
</nav>

<style>
	nav {
		display: flex;
		padding: 32px 60px;
	}

	ul {
		display: flex;
		align-items: center;
		column-gap: 24px;
		margin: auto 40px;
	}

	li {
		font-size: 20px;
	}

	button {
		background-color: transparent;
		border: none;
		color: white;
		cursor: pointer;
		margin: auto 0px auto auto;
	}
</style>
