<script lang="ts">
	import { FloatingLabelInput } from 'flowbite-svelte';
	import type { InputType } from 'flowbite-svelte/dist/types';
	export let choice: 'standard' | 'outlined' | 'filled';
	export let type: InputType;
	export let label: string;
	export let name: string;
	export let value: string;
</script>

<div class="p-3 w-full">
	{#if choice === 'standard'}
		<FloatingLabelInput {name} {type} {label} bind:value />
	{:else if choice === 'outlined'}
		<FloatingLabelInput style="outlined" {name} {type} {label} bind:value />
	{:else if choice === 'filled'}
		<FloatingLabelInput style="filled" {name} {type} {label} bind:value />
	{/if}
</div>
