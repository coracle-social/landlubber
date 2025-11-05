<script lang="ts">
	import { makeRoomMeta } from '@welshman/util';
	import { waitForThunkError, removeRoomMember } from '@welshman/app';
	import ProfileLink from '$lib/ProfileLink.svelte';
	import { selectedRelay } from '$lib/state';

	let { h, pubkeys, update } = $props();

	const room = makeRoomMeta({ h });

	const removeMember = async (pubkey: string) => {
		const message = await waitForThunkError(removeRoomMember($selectedRelay, room, pubkey));

		if (message) {
			return alert(message);
		}

		update();
	};
</script>

<div class="flex flex-col gap-2">
	{#each pubkeys as pubkey (pubkey)}
		<div class="card bg-base-200">
			<div class="card-body flex flex-row items-center justify-between gap-4">
				<ProfileLink {pubkey} />
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
						<li><button onclick={() => removeMember(pubkey)}>Remove member</button></li>
					</ul>
				</div>
			</div>
		</div>
	{/each}
</div>
