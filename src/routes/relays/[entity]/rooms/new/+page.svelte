<script lang="ts">
	import { goto } from '$app/navigation';
	import { displayRelayUrl, makeRoomMeta } from '@welshman/util';
	import type { RoomMeta } from '@welshman/util';
	import { getThunkError, createRoom, editRoom } from '@welshman/app';
	import RoomForm from '$lib/RoomForm.svelte';
	import { selectedRelay, encodeRelay } from '$lib/state';

	const room = makeRoomMeta();

	const onsubmit = async (room: RoomMeta) => {
		const createMessage = await getThunkError(createRoom($selectedRelay, room));

		if (createMessage && !createMessage.includes('already a member')) {
			return alert(createMessage);
		}

		const editMessage = await getThunkError(editRoom($selectedRelay, room));

		if (editMessage) {
			return alert(editMessage);
		}

		goto(`/relays/${encodeRelay($selectedRelay)}/rooms`);
	};
</script>

<div class="flex flex-col gap-8">
	<div>
		<h1 class="text-3xl font-bold">Add New Room</h1>
		<p class="text-base-content/70 text-lg">On {displayRelayUrl($selectedRelay)}</p>
	</div>
	<RoomForm {room} {onsubmit} />
</div>
