<script lang="ts">
	import { getThunkError, deleteRoom } from '@welshman/app';
	import { getTagValue, readRoomMeta, getTag } from '@welshman/util';
	import { selectedRelay, encodeRelay } from '$lib/state';

	const { event, onremove } = $props();
	const room = readRoomMeta(event);
	const name = getTagValue('name', event.tags);
	const about = getTagValue('about', event.tags);
	const isPrivate = getTag('private', event.tags);
	const isClosed = getTag('closed', event.tags);
	const flotillaLink = `https://app.flotilla.social/spaces/${encodeRelay($selectedRelay)}/${room.id}`;

	const _deleteRoom = async () => {
		const error = await getThunkError(deleteRoom($selectedRelay, room));

		if (error) {
			alert(error);
		} else {
			onremove();
		}
	};
</script>

<div class="card bg-base-200">
	<div class="card-body flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<p class="text-2xl">{name || '[no name]'}</p>
			<div class="flex gap-2">
				{#if isPrivate}
					<div class="badge badge-primary">Private</div>
				{/if}
				{#if isClosed}
					<div class="badge badge-primary">Closed</div>
				{/if}
			</div>
		</div>
		{#if about}
			<p>{about}</p>
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
					<li><a href={flotillaLink} target="_blank">View on Flotilla</a></li>
					<li>
						<a href="/relays/{encodeRelay($selectedRelay)}/rooms/{room.id}/edit">Edit room</a>
					</li>
					<li><button onclick={_deleteRoom} class="text-error">Delete room</button></li>
				</ul>
			</div>
		</div>
	</div>
</div>
