<script lang="ts">
	import DashHead from '$lib/components/commons/DashHead.svelte';

	const breadcrumbs = [
		{ home: true, href: '/', title: 'Home' },
		{ home: false, href: '/dashboard', title: 'Dashboard' },
		{ home: false, href: '/dashboard/profile', title: 'Profile' }
	];
</script>

<DashHead {breadcrumbs} title="Profile" description="Manage your profile on Gridlog" />
