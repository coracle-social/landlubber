<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { randomId, uniq } from '@welshman/lib';
	import { displayRelayUrl } from '@welshman/util';
	import { getThunkError, createRoom, editRoom, joinRoom } from '@welshman/app';
	import RelayCheck from '$lib/RelayCheck.svelte';
	import { decodeRelay, encodeRelay } from '$lib/state';

	const { entity, h } = $page.params;
	const url = decodeRelay(entity)

	function goBack() {
		goto(`/relays/${encodeRelay(url)}/rooms`)
	}
</script>

<div class="mx-auto max-w-2xl">
	<div class="mb-8">
		<h1 class="text-3xl font-bold">(Room Name)</h1>
		<p class="text-base-content/70 text-lg">A NIP 29 group on {displayRelayUrl(url)}</p>
	</div>
</div>
