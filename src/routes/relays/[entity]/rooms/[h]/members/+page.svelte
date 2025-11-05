<script lang="ts">
	import * as nip19 from 'nostr-tools/nip19';
	import { page } from '$app/stores';
	import {
		readRoomMeta,
		makeRoomMeta,
		getPubkeyTagValues,
		ROOM_MEMBERS,
		ROOM_META
	} from '@welshman/util';
	import { load } from '@welshman/net';
	import { waitForThunkError, addRoomMember } from '@welshman/app';
	import RoomMembers from '$lib/RoomMembers.svelte';
	import { selectedRelay, deriveEventsForUrl } from '$lib/state';

	const { h } = $page.params;

	const metaEvents = deriveEventsForUrl($selectedRelay, [{ kinds: [ROOM_META], '#d': [h] }]);
	const room = $derived(
		$metaEvents.length > 0 ? readRoomMeta($metaEvents[0]) : makeRoomMeta({ h })
	);

	const update = () => key++;

	const addMember = async () => {
		let pubkey = (prompt('Enter member public key (npub or hex):') || "").trim();

		if (pubkey.startsWith('npub')) {
			try {
				pubkey = nip19.decode(pubkey).data as string;
			} catch (e) {
				return alert('Failed to decode pubkey');
			}
		}

		if (!pubkey.match(/[0-9a-f]{64}/)) {
			return alert('Invalid hex pubkey');
		}

		const message = await waitForThunkError(addRoomMember($selectedRelay, room, pubkey));

		if (message) {
			return alert(message);
		}

		update();
	};

	let key = $state(0);
</script>

<div class="flex flex-col gap-8">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">Members</h1>
			<p class="text-base-content/70 text-lg">{room.name}</p>
		</div>
		<div class="flex justify-end">
			<button onclick={addMember} class="btn btn-primary btn-sm">
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
					></path></svg
				>
				Add Member
			</button>
		</div>
	</div>
	{#key key}
		{#await load({ relays: [$selectedRelay], filters: [{ kinds: [ROOM_MEMBERS], '#d': [h] }] })}
			<div class="m-auto flex gap-3 py-20">
				<div class="loading loading-sm"></div>
				Loading...
			</div>
		{:then events}
			{#if events.length > 0}
				<RoomMembers {h} {update} pubkeys={getPubkeyTagValues(events[0].tags)} />
			{:else}
				<p class="py-20 text-center">Failed to load room members!</p>
			{/if}
		{/await}
	{/key}
</div>
