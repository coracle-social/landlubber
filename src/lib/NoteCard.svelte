<script lang="ts">
	import { formatTimestamp } from '@welshman/lib';
	import { deriveProfileDisplay } from '@welshman/app';
	import NoteContent from '$lib/NoteContent.svelte';

	const { event } = $props();
	const profileDisplay = deriveProfileDisplay(event.pubkey);
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<div class="font-bold">@{$profileDisplay}</div>
		<div>{formatTimestamp(event.created_at)}</div>
	</div>
	<NoteContent {event} />
</div>
