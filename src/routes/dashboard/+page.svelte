<script lang="ts">
	import { page } from '$app/stores';
	import DashHead from '$lib/components/commons/DashHead.svelte';

	const user = $page.data.user;

	const breadcrumbs = [
		{ home: true, href: '/', title: 'Home' },
		{ home: false, href: '/dashboard', title: 'Dashboard' }
	];
</script>

<DashHead {breadcrumbs} title="Dashboard Summary" description="Welcome, {user.firstName}" />
