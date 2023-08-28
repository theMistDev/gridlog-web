<!-- <script lang="ts">
	import CustomButton from '$lib/components/forms/CustomButton.svelte';
	import FloatingInput from '$lib/components/forms/FloatingInput.svelte';
	import { handler } from '$lib/utils/handler';

	const resetPasswordDetails = {
		email: '',
		password: ''
	};

	let mailSent = false;

	let errorMsg: string = '';

	const handleSubmit = async () => {
		try {
			const submission = await handler('resetPassword', resetPasswordDetails);

			if (submission.success) {
				mailSent = true;
			} else {
				errorMsg = submission.message;
				console.log('fail', submission.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
</script>

<section class="grid grid-cols-1 lg:grid-cols-2 h-screen relative dark:bg-darkBlue">
	<div class=" bg-gradient-to-br from-black from-70% to-customBlue col-span-1 h-[40vh] lg:h-full">
		<div class="relative h-full w-full">
			<div class="absolute inset-0 flex justify-center items-center lg:p-32 z-10 p-10">
				<div
					class="bg-white/30 border backdrop-blur-md w-full h-full flex justify-center items-center"
				>
					<img
						src="/auth/forgot-password.png"
						class=" h-[30vw] lg:h-[50vh] object-cover"
						alt="three-rings-wafleries"
					/>
				</div>
			</div>
		</div>
	</div>

	<div
		class=" h-[60vh] w-full lg:h-full flex flex-col justify-center items-center relative px-5 text-center lg:text-right lg:py-10"
	>
		<img
			src="/logo-blue.png"
			class="absolute max-h-[50vh] object-cover"
			alt="wafleries-blue-logo"
		/>

		{#if mailSent === false}
			<div class=" flex flex-col lg:justify-center items-center col-span-1 max-w-xl w-full">
				<h1 class="text-customBlue font-bold text-2xl lg:text-4xl lg:pb-8">
					Forgot Your Password?
				</h1>
				<p class="text-sm lg:text-2xl lg:pb-8">Enter your email to reset</p>

				<form
					on:submit|preventDefault={handleSubmit}
					class="w-full flex flex-col items-center justify-center"
				>
					<div class=" w-full my-1 lg:my-4">
						<FloatingInput
							name="email"
							label="Enter your work email"
							type="text"
							bind:value={resetPasswordDetails.email}
						/>
					</div>

					<div class="flex justify-between w-full lg:my-4">
						<div>
							<a href="/" class="text-xs lg:text-sm text-yellow-500">Login Instead</a>
						</div>
					</div>

					<p class="text-red-500">{errorMsg}</p>
					<div class=" mt-4 lg:mt-16 w-full relative z-10">
						<CustomButton title="RESET PASSWORD" />
					</div>
				</form>
			</div>
		{:else}
			<div class="text-left">
				<p class="text-3xl font-bold">A password reset link has been sent to your email</p>
				<p class="">Please check your office email for the link.</p>
			</div>
		{/if}
	</div>
</section> -->
