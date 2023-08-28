<script lang="ts">
	import { goto } from '$app/navigation';
	import CircleLoading from '$lib/components/commons/CircleLoading.svelte';
	import CustomFloatingInput from '$lib/components/forms/CustomFloatingInput.svelte';
	import { handler } from '$lib/utils/handler';
	import { Button } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';

	const registrationDetails = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: ''
	};

	enum AppState {
		idle,
		loading,
		loaded,
		verifyEmail
	}

	let errorMsg: string = '';

	let appState: AppState = AppState.idle;

	const handleSubmit = async () => {
		try {
			appState = AppState.loading;
			const submission = await handler('registerEmail', registrationDetails);
			if (submission) {
				appState = AppState.loaded;
			}

			if (submission.success) {
				goto('/dashboard', { invalidateAll: true });
			} else {
				errorMsg = submission.message;
				console.log(errorMsg);
				if (errorMsg && errorMsg === 'Email not verified') {
					appState = AppState.verifyEmail;
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
		}
	};
</script>

{#if appState === AppState.idle}
	<div class="flex flex-col justify-center items-center">
		<h1 class="font-bold text-xl pt-4">Register on GridLog</h1>
		<form on:submit|preventDefault={handleSubmit} class="w-full px-3">
			<div class="flex w-full justify-start items-center">
				<CustomFloatingInput
					choice="standard"
					type="text"
					label="Enter Your First Name"
					name="firstname"
					bind:value={registrationDetails.firstName}
				/>
				<CustomFloatingInput
					choice="standard"
					type="text"
					label="Enter Your Last Name"
					name="lastname"
					bind:value={registrationDetails.lastName}
				/>
			</div>
			<CustomFloatingInput
				choice="standard"
				type="email"
				label="Enter Your Email"
				name="email"
				bind:value={registrationDetails.email}
			/>
			<div class="flex w-full justify-start items-center">
				<CustomFloatingInput
					choice="standard"
					type="password"
					label="Enter Your Password"
					name="password"
					bind:value={registrationDetails.password}
				/>

				<CustomFloatingInput
					choice="standard"
					type="password"
					label="Confirm Your Password"
					name="password2"
					bind:value={registrationDetails.password2}
				/>
			</div>

			<div class="p-2">
				<Button type="submit" size="lg" color="blue" class="w-full">
					Register
					<Icon name="user-outline" class="w-3.5 h-3.5 ml-2" />
				</Button>
			</div>
		</form>
	</div>
{:else if appState === AppState.loading}
	<CircleLoading />
{:else if appState === AppState.verifyEmail}
	<div class="text-center lg:text-left p-3">
		<p class="text-bold text-2xl">Your Email address has not been verified.</p>
		<p>
			Please click the link sent to your email to verify and login back again. Refresh page to try
			login again.
		</p>
	</div>
{/if}
