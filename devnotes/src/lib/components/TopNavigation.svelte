<script lang="ts">
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem
	} from 'flowbite-svelte';
	import { UserCircleSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
</script>

<Navbar let:NavContainer class="border-b-2 border-gray-100">
	<NavContainer class="max-w-screen-lg">
		<NavBrand href="/">
			<span
				class="color-default-800 self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>DevNotes</span
			>
		</NavBrand>

		<div class="flex items-center justify-between md:order-2">
			<NavHamburger />
			{#if !$page.data.session}
				<SignIn signInPage="signin" provider="google">
					<span
						slot="submitButton"
						class="inline-flex items-center justify-center rounded-lg border border-primary-700 px-5 py-2.5 text-center text-sm font-medium text-primary-700 focus-within:outline-none focus-within:ring-4 focus-within:ring-primary-300 hover:bg-primary-700 hover:text-white dark:border-primary-500 dark:text-primary-500 dark:focus-within:ring-primary-800 dark:hover:bg-primary-600 dark:hover:text-white"
					>
						Log In
					</span>
				</SignIn>
			{:else}
				{#if $page.data.session.user?.image}
					<Avatar id="user-drop" src={$page.data.session.user?.image} class="cursor-pointer" />
				{:else}
					<UserCircleSolid size="xl" class="cursor-pointer" />
				{/if}
				<Dropdown triggeredBy="#user-drop">
					<DropdownHeader>
						<span class="block text-sm">{$page.data.session.user?.name}</span>
						<span class="block truncate text-sm font-medium">{$page.data.session.user?.email}</span>
					</DropdownHeader>
					<li>
						<SignOut signOutPage="signout" className="w-full [&>button]:w-full">
							<div
								slot="submitButton"
								class="w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600"
							>
								Log Out
							</div>
						</SignOut>
					</li>
				</Dropdown>
			{/if}
		</div>

		{#if $page.data.session}
			<NavUl class="order-1">
				<NavLi href="/notes">My Notes</NavLi>
			</NavUl>
		{/if}
	</NavContainer>
</Navbar>
