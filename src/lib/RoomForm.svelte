<script lang="ts">
	const { room, onsubmit } = $props();

	function goBack() {
		history.back();
	}

	const submit = async () => {
		loading = true;

		await onsubmit({ ...room, name, about });

		loading = false;
	};

	let loading = $state(false);
	let name = $state(room.name);
	let about = $state(room.about);
</script>

<div class="flex flex-col">
	<label class="label pb-2" for="room-name">
		<span class="label-text text-base font-medium">Room Name</span>
	</label>
	<input
		id="room-name"
		type="text"
		placeholder="My Room"
		class="input input-bordered w-full"
		bind:value={name}
	/>
</div>
<div class="flex flex-col">
	<label class="label pb-2" for="room-description">
		<span class="label-text text-base font-medium">Room Description</span>
	</label>
	<textarea id="room-description" class="textarea textarea-bordered w-full" bind:value={about}>
	</textarea>
</div>
<div class="flex justify-between">
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
	<button class="btn btn-primary" disabled={loading} onclick={submit}>
		{#if loading}
			<div class="loading"></div>
		{:else}
			<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
		{/if}
		Save Room
	</button>
</div>
