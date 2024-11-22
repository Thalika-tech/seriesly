<script lang="ts">
	import Logo from '$assets/logo.png';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { getUserState } from '$lib/state/user-state.svelte';
  	import { goto } from '$app/navigation';

	let userContext = getUserState();

	let currentUrl = $page.url.href;
	let activePage = $state(currentUrl.slice(currentUrl.lastIndexOf("/")+1, currentUrl.length))

	const changeTab = (value: string) => {
		activePage = value;
		goto(`/private/${value}`);
	}
</script>

<nav>
	<a href="/private/myshows">
		<img src={Logo} alt="logo" />
	</a>
	<ul>
		<li><button onclick={() => changeTab("myshows")} class="nav_btn" class:nav_btn_select={activePage === "myshows"}>My Shows</button></li>
		<li><button onclick={() => changeTab("allshows")} class="nav_btn" class:nav_btn_select={activePage === "allshows"}>All Shows</button></li>
		<!-- <li><button onclick={() => changeTab("newshows")} class="nav_btn" class:nav_btn_select={activePage === "newshows"}>New & Popular</button></li> -->
	</ul>
	<!-- <p>{user?.email}</p> -->
	<button onclick={() => userContext.logout()}
	class="icon_btn"><Icon icon="material-symbols:logout-rounded" width="32" height="32" /></button>
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

	.icon_btn {
		background-color: transparent;
		border: none;
		color: white;
		cursor: pointer;
		margin: auto 0px auto auto;
		
	}

	.nav_btn {
		font-size: 20px;
		background-color: transparent;
		border: none;
		color: white;
		cursor: pointer;
	}

	.nav_btn_select{
		font-weight: bold;
	}
</style>
