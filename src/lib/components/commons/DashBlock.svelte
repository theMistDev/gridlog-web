<script lang="ts">
	import DashButton from '$lib/components/commons/DashButton.svelte';
	import { Heading } from 'flowbite-svelte';

	export let buttons: {
		href: string;
		title: string;
		description: string;
	}[];

	export let title: string;
</script>

<div class="p-3">
	<section class="pl-3 border py-5 border-gray-700 w-full mb-5">
		<Heading tag="h3" class="mb-2" customSize="text-xl font-extrabold  md:text-2xl lg:text-3xl"
			>{title}</Heading
		>
		<div class="flex flex-wrap">
			{#each buttons as button}
				<DashButton href={button.href} title={button.title} description={button.description} />
			{/each}
		</div>
	</section>
</div>
