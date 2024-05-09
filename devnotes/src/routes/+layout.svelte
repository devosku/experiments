<script lang="ts">
	import '../app.pcss';
	import { Footer, FooterCopyright } from 'flowbite-svelte';
	import TopNavigation from '$lib/components/TopNavigation.svelte';
</script>

<div class="h-full min-h-screen flex flex-col justify-between dark:bg-gray-800">
	<TopNavigation />

	<div class="container mx-auto max-w-screen-lg flex-grow px-0 py-8">
		<slot></slot>
	</div>

	<Footer class="bg-primary-900 p-4">
		<FooterCopyright
			href="/"
			by="DevOsku"
			year={2024}
			aClass="text-white"
			spanClass="block text-sm text-gray-400 sm:text-center"
		/>
	</Footer>
</div>
