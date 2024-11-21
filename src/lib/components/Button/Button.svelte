<script lang="ts">
	import type { Snippet } from 'svelte';

	interface BasicProps {
		children: Snippet;
		isSecondary?: boolean;
		isFullWidth?: boolean;
		icon?: string;
	}

	interface ButtonProps extends BasicProps {
		onclick?: (e: MouseEvent) => void;
		href?: never;
		type?: 'submit' | 'button';
	}

	interface LinkProps extends BasicProps {
		href: string;
		onclick?: never;
	}

	type ComponentProps = ButtonProps | LinkProps;

	let { children, href, onclick, isSecondary, isFullWidth, icon, ...props }: ComponentProps =
		$props();
</script>

{#if href}
	<a {href} class="btn" class:btn-secondary={isSecondary} class:btn-full={isFullWidth}>
		{@render children()}
	</a>
{:else}
	<button
		{...props}
		{onclick}
		class="btn"
		class:btn-secondary={isSecondary}
		class:btn-full={isFullWidth}
	>
		{#if icon}
			<img src={icon} alt="icon" class="icon" />
		{/if}

		<p>{@render children()}</p>
	</button>
{/if}

<style>
	a {
		display: block;
		text-decoration: none;
	}

	a:hover {
		text-decoration: none;
	}

	.btn {
		padding: 12px 24px;
		min-width: 140px;
		text-align: center;
		background-color: #007aff;
		border-radius: 12px;
		color: white;
		font-weight: normal;
		font-size: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		border: none;
	}

	.btn-secondary {
		background-color: transparent;
		color: white;
		border: 1px solid white;
	}

	.btn-full {
		width: 100%;
	}

	.icon {
		margin-right: 16px;
	}
</style>
