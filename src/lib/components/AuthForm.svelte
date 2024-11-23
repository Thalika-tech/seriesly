<script lang="ts">
	import type { ActionData } from '../../routes/register/$types';
	import Button from './Button/Button.svelte';
	import Google from '$assets/google.png';

	interface ComponentProps {
		isRegistration: boolean;
		form: ActionData;
	}

	let { isRegistration, form }: ComponentProps = $props();
</script>

<div class="card">
	<h1 class="title">{isRegistration ? 'Sign Up' : 'Login'}</h1>
	<div class="form-and-social-login">
		<form
			class="auth-form"
			method="POST"
			action={isRegistration ? '' : '/login/?/signInWithPassword'}
		>
			{#if form && form.errors?.length}
				{#each form.errors as error}
					<div class="auth-error">
						<p>{error}</p>
					</div>
				{/each}
			{/if}

			{#if isRegistration}
				<input placeholder="Username" type="text" name="username" value={form?.username || ''} />
			{/if}

			<input placeholder="Email" type="text" name="email" value={form?.email || ''} />
			<input placeholder="Password" type="password" name="password" value={form?.password || ''} />

			{#if isRegistration}
				<input
					placeholder="Confirm password"
					type="password"
					name="passwordConfirmation"
					value={form?.passwordConfirmation || ''}
				/>
			{/if}
			<Button type="submit" isFullWidth={true}>{isRegistration ? 'Sign Up' : 'Login'}</Button>
		</form>
	
		<div class="divider">
			<hr class="line" />
			<p style="color: grey; margin: 0 10px;">OR</p>
			<hr class="line" />
		</div>

		<form method="POST" action={isRegistration ? '/login/?/googleLogin' : '?/googleLogin'}>
			<Button type="submit" isFullWidth={true} isSecondary={true} icon={Google}
				>Login with Google</Button
			>
		</form>

		{#if isRegistration}
			<p class="helper">Already have an account? <a href="/login">Log In</a></p>
		{:else}
			<p class="helper">Don't have an account yet? <a href="/register">Sign Up</a></p>
		{/if}
	</div>
</div>

<style>
	.card {
		width: 400px;
		margin: auto auto 60px auto;
	}

	.title {
		font-size: 72px;
		text-align: center;
		margin: 24px 0px 24px;
	}

	.form-and-social-login {
		display: block;
	}

	.auth-form {
		display: block;
	}

	.auth-error {
		background-color: rgb(122, 35, 35);
		color: white;
		font-size: 18px;
		border-radius: 12px;
		padding: 12px;
		width: 100%;
		margin-bottom: 8px;
	}

	.auth-error:last-of-type {
		margin-bottom: 16px;
	}

	.auth-form input {
		width: 100%;
		margin-bottom: 12px;
	}

	.auth-form input:last-of-type {
		margin-bottom: 30px;
	}

	.divider {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 24px 0px;
	}

	.line {
		flex: 1;
		border: none;
		border-top: 1px solid grey;
	}

	.helper {
		text-align: center;
		color: gray;
		margin-top: 24px;
	}
</style>
