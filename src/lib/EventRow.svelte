<script lang="ts">
	import { deriveProfileDisplay, manageRelay } from '@welshman/app';
	import { formatTimestamp } from '@welshman/lib';
	import { ManagementMethod } from '@welshman/util';
	import NoteContent from '$lib/NoteContent.svelte';
	import ProfileLink from '$lib/ProfileLink.svelte';
	import { eventLink, selectedRelay } from '$lib/state';

	const { event, banned, onremove, onban, onrestore } = $props();

	const copyEvent = () => {
		const { activeElement } = document;
		const input = document.createElement('textarea');

		input.innerHTML = JSON.stringify(event, null, 2);
		document.body.appendChild(input);
		input.select();
		document.execCommand('copy');
		document.body.removeChild(input);
		(activeElement as HTMLElement).focus();

		alert('Copied event JSON to clipboard!');
		// @ts-ignore
		document.activeElement?.blur();
	};

	const deleteEvent = async () => {
		// @ts-ignore
		document.activeElement?.blur();
		const { error } = await manageRelay($selectedRelay, {
			method: ManagementMethod.BanEvent,
			params: [event.id, '']
		});

		if (error) {
			alert(`Failed to delete the event: ${error}`);
		} else {
			onremove();
		}
	};

	const restoreUser = async () => {
		// @ts-ignore
		document.activeElement?.blur();
		const { error } = await manageRelay($selectedRelay, {
			method: ManagementMethod.AllowPubkey,
			params: [event.pubkey, '']
		});

		if (error) {
			alert(`Failed to restore user: ${error}`);
		} else {
			onrestore();
		}
	};

	const banUser = async () => {
		// @ts-ignore
		document.activeElement?.blur();
		const { error } = await manageRelay($selectedRelay, {
			method: ManagementMethod.BanPubkey,
			params: [event.pubkey, '']
		});

		if (error) {
			alert(`Failed to ban the user: ${error}`);
		} else {
			onban();
		}
	};
</script>

<tr>
	<td class="font-semibold wrap-anywhere">
  	<ProfileLink pubkey={event.pubkey} />
		{#if banned}
			<span class="badge badge-xs badge-error">Banned</span>
		{/if}
	</td>
	<td>
		<span class="badge badge-xs badge-outline badge-round">{event.kind}</span>
	</td>
	<td class="text-xs opacity-75">
		{formatTimestamp(event.created_at)}
	</td>
	<td class="hidden max-w-xs truncate lg:table-cell">
		<NoteContent {event} />
	</td>
	<td>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-xs">
				Actions <svg class="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
					></path></svg
				>
			</div>
			<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
				<li><button onclick={copyEvent}>Copy Event JSON</button></li>
				<li><a href={eventLink(event, [$selectedRelay])} target="_blank">View on Coracle</a></li>
				{#if banned}
					<li><button onclick={restoreUser}>Restore User</button></li>
				{:else}
					<li><button class="text-error" onclick={banUser}>Ban User</button></li>
				{/if}
				<li><button onclick={deleteEvent} class="text-error">Delete Event</button></li>
			</ul>
		</div>
	</td>
</tr>
