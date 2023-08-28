<script lang="ts">
	import { handler } from '$lib/utils/handler';
	import Tab from './Tab.svelte';

	let state = 'login';



</script>

<section
	class="grid grid-cols-1 lg:grid-cols-2 lg:h-screen"
	style="background-image: url('https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'); background-size: cover;"
>
	<div class="left-side do not delete" />
	<div class="flex justify-center items-center">
		<div class="box w-[40vw] h-[60vh]v min-h-[20rem]">
			<Tab />
		</div>
	</div>
</section>
