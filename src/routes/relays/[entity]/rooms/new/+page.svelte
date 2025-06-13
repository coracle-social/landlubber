<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { randomId, uniq } from '@welshman/lib';
	import { displayRelayUrl } from '@welshman/util';
	import { getThunkError, createRoom, editRoom, joinRoom } from '@welshman/app';
	import RelayCheck from '$lib/RelayCheck.svelte';
	import { decodeRelay, encodeRelay } from '$lib/state';

	const { entity } = $page.params;
	const url = decodeRelay(entity)
  const h = randomId()

	function goBack() {
		history.back()
	}

  const onSubmit = async () => {
    loading = true

    const createMessage = await getThunkError(createRoom(url, h))

    if (createMessage && !createMessage.includes('already a member')) {
      loading = false
      return alert(createMessage)
    }

    const editMessage = await getThunkError(editRoom(url, h, {name}))

    if (editMessage) {
      loading = false
      return alert(editMessage)
    }


    console.log(`/relays/${encodeRelay(url)}/rooms/${h}`)
    goto(`/relays/${encodeRelay(url)}/rooms/${h}`)
  }

  let name = $state("")
  let loading = $state(false)
</script>

<div class="mx-auto max-w-2xl">
	<div class="mb-8">
		<h1 class="text-3xl font-bold">Add New Room</h1>
		<p class="text-base-content/70 text-lg">On {displayRelayUrl(url)}</p>
	</div>
	<div class="card bg-base-100 border-base-300 border shadow-lg">
		<div class="card-body p-8">
			<div class="form-control">
				<label class="label pb-2" for="room-name">
					<span class="label-text text-base font-medium">Room Name</span>
				</label>
				<input
					id="room-name"
					type="text"
					placeholder="My Room"
					class="input input-bordered flex-1 text-base w-full"
					bind:value={name}
				/>
				<label class="label pt-1">
					<span class="label-text-alt text-base-content/60">
						Enter the name of your room.
					</span>
				</label>
			</div>
			<div class="card-actions border-base-200 mt-8 justify-between border-t pt-8">
				<button class="btn btn-ghost" onclick={goBack}>
					<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Go Back
				</button>
				<button class="btn btn-primary" disabled={!name || loading} onclick={onSubmit}>
  				{#if loading}
    				<div class="loading"></div>
  				{:else}
  					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  						<path
  							stroke-linecap="round"
  							stroke-linejoin="round"
  							stroke-width="2"
  							d="M12 4v16m8-8H4"
  						/>
  					</svg>
					{/if}
					Add Room
				</button>
			</div>
		</div>
	</div>
</div>
