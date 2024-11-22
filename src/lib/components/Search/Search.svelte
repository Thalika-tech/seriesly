<script lang="ts">
	import Icon from '@iconify/svelte';

    interface ComponentProps {
        handleChange: (event: any) => void;
        inputValue: string;
    }

	let { handleChange, inputValue }: ComponentProps = $props();
</script>

<div class="search">
    <input placeholder="Search" oninput={handleChange} bind:value={inputValue}/>
    <div class="icon_div"><Icon icon="tabler:search" width="24" height="24"/></div>
</div>

<style>
	.search{
		height: fit-content;
		margin-left: auto;
		border-radius: 8px;
		border: 1px solid grey;
		padding: 0px 12px 0px 0px;
		display: flex;
	}

	.icon_div {
		margin: auto 0px auto 0px;
		display: flex;
		align-items: center;
		justify-items: center;
		color: grey;
	}

	input {
		border: none;
	}
</style>
