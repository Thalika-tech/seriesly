<script lang="ts">
    import './../app.css';
	import Logo from '$assets/logo.png';
	import Placeholder from '$assets/placeholder.png';
	import { invalidate } from '$app/navigation';
	import { Navbar } from '$components';
    import { getUserState, setUserState } from "$lib/state/user-state.svelte";



    let {children, data}  = $props();
    // Derived: anytime data changes, we want to update our session, supabase and user proprty
    let {session, supabase} = $derived(data);
    // Set the global context in the layout.svelte that wraps around the main route
    let userState = setUserState({session: data.session, supabase: data.supabase, user: data.user})

    // Remember effect = useEffect, don't specify dependencies, all variables used inside acts as dependancies
    $effect(() => {
        const { data } = supabase.auth.onAuthStateChange((_ : any, newSession : any) => {
            userState.updateState({session: newSession, supabase, user: newSession?.user || null});
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
			
		});

		return () => data.subscription.unsubscribe();
    });
	console.log(data)

</script>


{#if data.user}
	<Navbar />
	{@render children()}
{:else}
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
{/if}

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