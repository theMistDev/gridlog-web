<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, DarkMode } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';

	export let breadcrumbs = [{ home: true, href: '/', title: 'Home' }];
	export let title: string;
	export let description = '';
</script>

<section class="p-3">
	<div class="box w-full flex justify-between items-center">
		<div>
			<p class="text-3xl font-bold tracking-wide">{title}</p>
			<p class="tl">{description}</p>
			<Breadcrumb
				aria-label="Solid background breadcrumb example"
				class="bg-gray-50 pt-3 dark:bg-gray-900"
			>
				{#each breadcrumbs as crumb}
					<BreadcrumbItem href={crumb.href} home={crumb.home}>
						<svelte:fragment slot="icon">
							<Icon
								name={crumb.home ? 'home-outline' : 'chevron-double-right-outline'}
								class="w-4 h-4 mr-2"
							/>
						</svelte:fragment>{crumb.title}
					</BreadcrumbItem>
				{/each}
			</Breadcrumb>
		</div>
		<div class="pr-3">
			<DarkMode />
		</div>
	</div>
</section>
