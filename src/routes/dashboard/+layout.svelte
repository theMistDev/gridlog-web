<script>
	import { Button, DarkMode } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';
	import Accord from './Accord.svelte';
</script>

<section class="flex flex-col md:flex-row w-full md:h-screen">
	<div class="box min-w-[15rem] w-full md:max-w-[17vw] h-full">
		<div class="flex flex-col justify-between h-full">
			<div class="flex flex-col">
				<Accord />
			</div>

			<div class="flex flex-col">
				<div class="h-0.5 bg-gray-500/50 w-full" />

				<div class="py-3">
					<Button
						color="alternative"
						class="w-full hover:dark:bg-gray-800 hover:bg-gray-200"
						href="/dashboard/profile"
					>
						<Icon name="user-outline" class="w-3.5 h-3.5 mr-2" />
						Profile
					</Button>
				</div>
				<Button color="red" class="w-full hover:dark:bg-red-800 hover:bg-gray-200" href="/auth">
					<Icon name="lock-outline" class="w-3.5 h-3.5 mr-2" />
					Log Out
				</Button>
			</div>
		</div>
	</div>

	<div class="w-full overflow-y-scroll h-full">
		<slot />
	</div>
</section>
