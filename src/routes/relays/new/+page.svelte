<script lang="ts">
	import {randomId, uniq} from '@welshman/lib'
	import {normalizeRelayUrl} from '@welshman/util'
	import { goto } from '$app/navigation';
	import RelayCheck from '$lib/RelayCheck.svelte'
	import {userRelays, selectedRelay, encodeRelay} from '$lib/state'

	let url = $state('');
	let check = $state("")

	function checkRelay() {
  	url = normalizeRelayUrl(url)
  	check = randomId()
	}

	function goBack() {
		goto('/');
	}

	function addRelay() {
    $userRelays = uniq([...$userRelays, url])
    $selectedRelay = url
		goto('/relays/' + encodeRelay(url));
	}
</script>

<div class="max-w-2xl mx-auto">
	<div class="mb-8">
		<div class="flex items-center gap-3 mb-2">
			<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
				<svg class="w-4 h-4 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
				</svg>
			</div>
			<h1 class="text-3xl font-bold">Add New Relay</h1>
		</div>
		<p class="text-base-content/70 text-lg">Connect to a new Nostr relay to expand your network reach</p>
	</div>

	<div class="card bg-base-100 shadow-lg border border-base-300">
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
						class="input input-bordered join-item flex-1 text-base focus:ring-2 focus:ring-primary/20"
						oninput={() => (check = "")}
						bind:value={url}
					/>
					<button 
						class="btn btn-primary join-item px-6" 
						disabled={!url.trim()} 
						onclick={checkRelay}
					>
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
						</svg>
						Test Connection
					</button>
				</div>
				<label class="label pt-1">
					<span class="label-text-alt text-base-content/60">
						Enter a WebSocket URL starting with <code class="text-xs bg-base-200 px-1 py-0.5 rounded">wss://</code>
					</span>
				</label>
			</div>

			{#if check}
				<div class="mt-6 p-4 bg-base-200 rounded-lg">
					{#key check}
						<RelayCheck {url} />
					{/key}
				</div>
			{/if}

			<div class="card-actions justify-between pt-8 border-t border-base-200 mt-8">
				<button class="btn btn-ghost" onclick={goBack}>
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
					</svg>
					Back to Dashboard
				</button>
				<button
					class="btn btn-primary btn-lg"
					disabled={!url.trim()}
					onclick={addRelay}
				>
					<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
					</svg>
					Add Relay
				</button>
			</div>
		</div>
	</div>
</div>
