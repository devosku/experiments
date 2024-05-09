<script lang="ts">
	import { Button, Heading, P } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import { SignIn } from '@auth/sveltekit/components';
</script>

<Heading tag="h1" class="mb-6" customSize="text-6xl font-extrabold">
	Welcome to the ultimate note-taking companion!
</Heading>

<Heading tag="h2" class="mb-6" customSize="text-2xl dark:text-gray-400">
	This app certainly does everything promised here for real for real.
</Heading>

{#if !$page.data.session}
	<SignIn signInPage="signin" provider="google">
		<span
			slot="submitButton"
			class="mb-6 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white focus-within:outline-none focus-within:ring-4 focus-within:ring-primary-300 hover:bg-primary-800 dark:bg-primary-600 dark:focus-within:ring-primary-800 dark:hover:bg-primary-700"
		>
			Log In To Get Started
			<ArrowRightOutline class="ms-2 h-6 w-6" />
		</span>
	</SignIn>
{:else}
	<Button href="/notes" class="mb-6">
		Go to Your Notes
		<ArrowRightOutline class="ms-2 h-6 w-6" />
	</Button>
{/if}

<P class="mb-6 text-lg dark:text-gray-400">
	Get ready to revolutionize the way you capture, organize, and unleash your ideas. Our note-taking
	app isn't just a tool; it's your creative playground, your digital brain, and your productivity
	powerhouse all rolled into one.
</P>

<img src="notebook.png" alt="Notebook" class="float-left mb-6 mr-8 max-w-96 rounded-lg shadow-lg" />

<P class="mb-6 text-lg dark:text-gray-400">
	Say goodbye to scattered thoughts and hello to seamless organization. With intuitive features
	designed to streamline your workflow, you'll spend less time managing your notes and more time
	bringing your ideas to life.
</P>

<P class="mb-6 text-lg dark:text-gray-400">
	Whether you're a student, a professional, or a lifelong learner, our app is your go-to solution
	for capturing inspiration wherever it strikes. From lectures and meetings to brainstorming
	sessions and late-night epiphanies, we've got you covered.
</P>

<P class="mb-6 text-lg dark:text-gray-400">
	But that's just the beginning. With powerful search capabilities, customizable categories, and
	seamless syncing across devices, your notes are always at your fingertips, ready to fuel your next
	big breakthrough.
</P>

<P class="mb-6 text-lg dark:text-gray-400">
	So why settle for ordinary note-taking when you can experience extraordinary? Join the revolution
	today and unlock your full potential with our cutting-edge app. Your ideas deserve the best - and
	we're here to deliver.
</P>
