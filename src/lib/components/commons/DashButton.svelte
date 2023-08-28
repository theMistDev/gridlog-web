<script lang="ts">
	export let href: string;
	export let title: string;
	export let description: string;
</script>

<a
	{href}
	class="box h-[7rem] w-[15rem] flex flex-col justify-center hover:bg-gray-100 dark:hover:bg-gray-800 mr-3 mb-3"
>
	<p class="font-bold text-xl tracking-tighter leading-none">{title}</p>
	<p class="tracking-tighter leading-none text-gray-500 dark:text-gray-400">
		{description}
	</p>
</a>
