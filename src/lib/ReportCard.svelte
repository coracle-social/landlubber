<script lang="ts">
	import { deriveProfileDisplay, manageRelay } from '@welshman/app';
	import { formatTimestamp } from '@welshman/lib';
	import { getTag, displayProfile, ManagementMethod } from '@welshman/util';
	import { deriveEvent } from '$lib/state';
	import NoteContent from '$lib/NoteContent.svelte';
	import NoteCard from '$lib/NoteCard.svelte';

	const { url, event, onremove } = $props();

	const profileDisplay = deriveProfileDisplay(event.pubkey);
	const etag = getTag('e', event.tags);
	const ptag = getTag('p', event.tags);
	const reason = etag?.[2] || ptag?.[2] || 'No reason provided';
	const target = etag ? deriveEvent(etag[1], [url]) : undefined;

	const dismissReport = async () => {
		const { error } = await manageRelay(url, {
			method: ManagementMethod.BanEvent,
			params: [event.id, 'Dismissed by admin']
		});

		if (error) {
			alert(`Failed to dismiss the report: ${error}`);
		} else {
			onremove();
		}
	};

	const deleteEvent = async () => {
		const { error } = await manageRelay(url, {
			method: ManagementMethod.BanEvent,
			params: [etag[1], reason]
		});

		if (error) {
			alert(`Failed to delete the event: ${error}`);
		} else {
			await dismissReport();
		}
	};

	const banUser = async () => {
		const { error } = await manageRelay(url, {
			method: ManagementMethod.BanPubkey,
			params: [$target?.pubkey || ptag[1], reason]
		});

		if (error) {
			alert(`Failed to ban the user: ${error}`);
		} else {
			await dismissReport();
		}
	};
</script>

<div class="card bg-base-200">
	<div class="card-body flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<div class="text-sm opacity-75">
				Submitted by <span class="font-semibold">@{$profileDisplay}</span> on {formatTimestamp(
					event.created_at
				)}
			</div>
			<div class="bg-primary text-primary-content rounded-full px-2 py-1">
				{reason}
			</div>
		</div>
		{#if etag}
			{#if $target}
				<div class="card bg-base-100">
					<div class="card-body">
						<NoteCard event={$target} />
					</div>
				</div>
			{:else}
				<div class="flex gap-2">
					<div class="loading"></div>
					<p>Loading reported note...</p>
				</div>
			{/if}
		{:else if ptag}
			<div class="alert alert-info">
				<div>
					<h4 class="font-semibold">Reported User</h4>
					<p class="text-sm opacity-75">User: {displayProfile({ pubkey: ptag[1] })}</p>
				</div>
			</div>
		{/if}
		{#if event.content}
			<div class="card bg-base-100">
				<div class="card-body flex flex-col gap-2">
					<p class="font-bold">Additional context:</p>
					<NoteContent {event} />
				</div>
			</div>
		{/if}
		<div class="card-actions justify-end">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-sm">
					Actions <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						></path></svg
					>
				</div>
				<ul
					tabindex="0"
					class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
				>
					<li><button onclick={dismissReport}>Dismiss</button></li>
					{#if etag}
						<li><button onclick={deleteEvent}>Delete event</button></li>
					{/if}
					<li><button onclick={banUser}>Ban event author</button></li>
				</ul>
			</div>
		</div>
	</div>
</div>
