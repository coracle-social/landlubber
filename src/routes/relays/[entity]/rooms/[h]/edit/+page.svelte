<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { displayRelayUrl, ROOM_META, readRoomMeta } from '@welshman/util';
	import type { RoomMeta } from '@welshman/util';
	import { load } from '@welshman/net';
	import { waitForThunkError, editRoom } from '@welshman/app';
	import RoomForm from '$lib/RoomForm.svelte';
	import { encodeRelay, selectedRelay } from '$lib/state';

	const { h } = $page.params;

	const onsubmit = async (room: RoomMeta) => {
		const error = await waitForThunkError(editRoom($selectedRelay, room));

		if (error) {
			return alert(error);
		}

		goto(`/relays/${encodeRelay($selectedRelay)}/rooms`);
	};
</script>

<div class="flex flex-col gap-8">
	<div>
		<h1 class="text-3xl font-bold">Edit Room</h1>
		<p class="text-base-content/70 text-lg">On {displayRelayUrl($selectedRelay)}</p>
	</div>
	{#await load({ relays: [$selectedRelay], filters: [{ kinds: [ROOM_META], '#d': [h] }] })}
		<div class="m-auto flex gap-3 py-20">
			<div class="loading loading-sm"></div>
			Loading...
		</div>
	{:then events}
		{#if events.length > 0}
			<RoomForm room={readRoomMeta(events[0])} {onsubmit} />
		{:else}
			<p class="py-20 text-center">Failed to load room!</p>
		{/if}
	{/await}
</div>
