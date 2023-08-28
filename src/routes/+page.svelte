<script>
	import { Heading, P, Button } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';
</script>

<section
	class=" w-full flex justify-center items-center h-screen"
	style="background-image: url('https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'); background-size: cover;"
>
	<div class="box rounded-md shadow-md">
		<div class="text-center py-10">
			<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
				>GridLog Module Manager</Heading
			>
			<P class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
				>A simple module manager designed to make daily tracking and logging of assigned modules
				easier.</P
			>
			<Button color="blue" href="/auth">
				Begin Here
				<Icon name="arrow-right-outline" class="w-3.5 h-3.5 ml-2" />
			</Button>
		</div>
	</div>
</section>
