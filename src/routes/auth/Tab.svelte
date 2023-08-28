<script>
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';
	import Login from './Login.svelte';
	import Register from './Register.svelte';
</script>

<Tabs style="underline">
	<TabItem open>
		<div slot="title" class="flex items-center gap-2">
			<Icon name="user-circle-solid" size="sm" />
			Log In
		</div>
		<div class="">
			<Login />
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<Icon name="grid-solid" size="sm" />
			Register
		</div>
		<div>
			<Register />
		</div>
	</TabItem>
</Tabs>
