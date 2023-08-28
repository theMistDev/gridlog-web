<script>
	import DashBlock from '$lib/components/commons/DashBlock.svelte';
	import { page } from '$app/stores';
	import DashHead from '$lib/components/commons/DashHead.svelte';

	const user = $page.data.user;

	const breadcrumbs = [
		{ home: true, href: '/', title: 'Home' },
		{ home: false, href: '/dashboard', title: 'Dashboard' },
		{ home: false, href: '/dashboard/manager', title: 'Gridlog Manager' }
	];
	const moduleButtons = [
		{
			href: '/dashboard/manager/view-module',
			title: 'View Modules',
			description: 'View details of existing modules on Gridlog'
		},
		{
			href: '/dashboard/manager/create-module',
			title: 'Create Module',
			description: 'Creates new modules on Gridlog'
		},
		{
			href: '/dashboard/manager/edit-module',
			title: 'Edit Module',
			description: 'Change details of existing modules on Gridlog'
		},
		{
			href: '/dashboard/manager/delete-module',
			title: 'Delete Module',
			description: 'Delete an existing module on Gridlog. Use with caution.'
		}
	];

	const taskButtons = [
		{
			href: '/dashboard/manager/view-module',
			title: 'View Task Status',
			description: 'View task status'
		},
		{
			href: '/dashboard/manager/create-module',
			title: 'Assign Task',
			description: 'Creates new modules on Gridlog'
		},
		{
			href: '/dashboard/manager/edit-module',
			title: 'Modify Task',
			description: 'Change details of existing modules on Gridlog'
		}
	];

	const teamButtons = [
		{
			href: '/dashboard/manager/view-module',
			title: "View Developer's Stats",
			description: 'View task status'
		},
		{
			href: '/dashboard/manager/view-module',
			title: "Modify Developer's Stats",
			description: 'Modify task status'
		}
	];
</script>

<DashHead
	{breadcrumbs}
	title="GridLog Manager"
	description="Manage development tasks and schedules"
/>

<section>
	<DashBlock buttons={moduleButtons} title="Module Manager" />
	<DashBlock buttons={taskButtons} title="Task Manager" />
	<DashBlock buttons={teamButtons} title="Team Manager" />
</section>
