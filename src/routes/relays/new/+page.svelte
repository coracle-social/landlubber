<script lang="ts">
	import { randomId, uniq } from '@welshman/lib';
	import { normalizeRelayUrl } from '@welshman/util';
	import { goto } from '$app/navigation';
	import RelayCheck from '$lib/RelayCheck.svelte';
	import { userRelays, encodeRelay } from '$lib/state';

	let url = $state('');
	let check = $state('');

	function checkRelay() {
		url = normalizeRelayUrl(url);
		check = randomId();
	}

	function goBack() {
		goto('/');
	}

	function addRelay() {
		$userRelays = uniq([...$userRelays, url]);
		goto('/relays/' + encodeRelay(url));
	}
</script>

<div class="mx-auto max-w-2xl">
	<div class="mb-8">
		<h1 class="text-3xl font-bold">Add New Relay</h1>
		<p class="text-base-content/70 text-lg">Connect to a Nostr relay you'd like to manage.</p>
	</div>

	<div class="card bg-base-100 border-base-300 border shadow-lg">
		<div class="card-body p-8">
			<div class="form-control">
				<label class="label pb-2" for="relay-url">
					<span class="label-text text-base font-medium">Relay URL</span>
				</label>
				<div class="join w-full">
					<input
						id="relay-url"
						type="text"
						placeholder="wss://relay.example.com"
						class="input input-bordered join-item focus:ring-primary/20 flex-1 text-base focus:ring-2"
						oninput={() => (check = '')}
						bind:value={url}
					/>
					<button
						class="btn btn-primary join-item px-6"
						disabled={!url.trim()}
						onclick={checkRelay}
					>
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Test Connection
					</button>
				</div>
				<label class="label pt-1">
					<span class="label-text-alt text-base-content/60">
						Enter a Nostr websocket URL starting with <code
							class="bg-base-200 rounded px-1 py-0.5 text-xs">wss://</code
						>
					</span>
				</label>
			</div>

			{#if check}
				<div class="bg-base-200 mt-6 rounded-lg p-4">
					{#key check}
						<RelayCheck {url} />
					{/key}
				</div>
			{/if}

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
					Back to Dashboard
				</button>
				<button class="btn btn-primary" disabled={!url.trim()} onclick={addRelay}>
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v16m8-8H4"
						/>
					</svg>
					Add Relay
				</button>
			</div>
		</div>
	</div>
</div>
