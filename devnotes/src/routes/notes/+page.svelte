<script lang="ts">
	import {
		Button,
		Heading,
		Input,
		Label,
		Modal,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Textarea
	} from 'flowbite-svelte';
	import { CirclePlusSolid } from 'flowbite-svelte-icons';
	import type { PageData } from '../$types';
	import type { Note } from '$lib/types';

	export let data: PageData & { notes: Note[] };

	let addNoteModalOpen = false;
</script>

<Button class="mb-8" on:click={() => (addNoteModalOpen = true)}>
	<CirclePlusSolid class="me-2 h-5 w-5" />
	Add Note
</Button>

<Modal bind:open={addNoteModalOpen} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" method="POST" action="?/add">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a new note</h3>
		<Label class="space-y-2">
			<span>Title</span>
			<Input name="title" class="bg-gray-50 dark:bg-gray-800" required/>
		</Label>
		<Label class="space-y-2">
			<span>Note</span>
			<Textarea name="content" required />
		</Label>
		<Button type="submit" class="w-full">Create</Button>
	</form>
</Modal>

{#if data.notes?.length > 0}
	{#each data.notes as note}
		<div class="mb-6 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
			<Heading tag="h2" class="mb-2 text-xl font-medium text-gray-900 dark:text-white">{note.title}</Heading>
			<P class="mb-4 text-gray-700 dark:text-gray-400">{note.content}</P>
			<form method="POST" action="?/delete">
				<input type="hidden" name="id" value={note.note_id} />
				<button type="submit" class="border-0 p-0, dark:text-primary-500 dark:hover:text-primary-100">Delete</button>
			</form>
		</div>
	{/each}

{:else}
	<P class="text-center text-gray-500 dark:text-gray-400">No notes found</P>
{/if}
