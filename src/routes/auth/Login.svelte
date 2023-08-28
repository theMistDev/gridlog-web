<script lang="ts">
	import { goto } from '$app/navigation';
	import CircleLoading from '$lib/components/commons/CircleLoading.svelte';
	import CustomFloatingInput from '$lib/components/forms/CustomFloatingInput.svelte';
	import { handler } from '$lib/utils/handler';
	import { Button } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';

	const loginDetails = {
		email: '',
		password: ''
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
			const submission = await handler('loginEmail', loginDetails);
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
		<h1 class="font-bold text-xl pt-4">Log In to Your GridLog Account</h1>
		<p class="text-red-500">{errorMsg}</p>
		<form on:submit|preventDefault={handleSubmit} class="w-full px-3">
			<CustomFloatingInput
				choice="standard"
				type="email"
				label="Enter Your Email"
				name="email"
				bind:value={loginDetails.email}
			/>
			<CustomFloatingInput
				choice="standard"
				type="password"
				label="Enter Your Password"
				name="password"
				bind:value={loginDetails.password}
			/>

			<div class="p-2">
				<Button type="submit" size="lg" color="blue" class="w-full">
					Log In
					<Icon name="lock-open-outline" class="w-3.5 h-3.5 ml-2" />
				</Button>
			</div>
			<p class="text-sm p-3">
				<span>Forgot Password? </span><span class="text-blue-500"
					><a href="/auth/password-reset">Reset</a></span
				>
			</p>
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
