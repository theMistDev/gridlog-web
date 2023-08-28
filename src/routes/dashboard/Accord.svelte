<script>
	import { AccordionItem, Accordion } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';
</script>

<Accordion>
	<AccordionItem>
		<span slot="header">
			<a href="/dashboard" class="text-base flex gap-2">
				<Icon name="grid-outline" class="mt-0.5" />
				<span>Dashboard Summary</span>
			</a>
		</span>
		<p class="mb-2 text-gray-500 dark:text-gray-400">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
			explicabo...
		</p>
		<p class="text-gray-500 dark:text-gray-400">
			Check out this guide to learn how to <a
				href="/"
				target="_blank"
				rel="noreferrer"
				class="text-blue-600 dark:text-blue-500 hover:underline"
			>
				get started
			</a>
			and start websites even faster with components on top of Tailwind CSS.
		</p>
	</AccordionItem>

	<AccordionItem>
		<span slot="header">
			<a href="/dashboard/manager" class="text-base flex gap-2">
				<Icon name="cog-outline" class="mt-0.5" />
				<span>GridLog Manager</span></a
			>
		</span>
		<p class="mb-2 text-gray-500 dark:text-gray-400">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus
			sintexplicabo...
		</p>
		<a href="/dashboard/manager/a">The A</a>
	</AccordionItem>

   	<AccordionItem>
		<span slot="header">
			<a href="/dashboard/developer" class="text-base flex gap-2">
				<Icon name="cog-outline" class="mt-0.5" />
				<span>GridLog Developer</span></a
			>
		</span>
		<p class="mb-2 text-gray-500 dark:text-gray-400">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus
			sintexplicabo...
		</p>
		<a href="/dashboard/manager/a">The A</a>
	</AccordionItem>
</Accordion>
