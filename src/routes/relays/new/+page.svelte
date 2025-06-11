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

<div class="flex flex-col gap-4">
	<h1 class="text-2xl font-bold mb-6">Add New Relay</h1>
	<div class="card bg-base-200">
		<div class="card-body">
			<div class="flex justify-between">
				<label class="label" for="relay-url">
					<span class="label-text">Relay URL</span>
				</label>
				<div class="join">
					<input
						id="relay-url"
						type="text"
						placeholder="wss://relay.example.com"
						class="input join-item flex-1 outline-none"
						oninput={() => (check = "")}
						bind:value={url}
					/>
					<button class="btn btn-primary join-item" disabled={!url.trim()} onclick={checkRelay} >
						Check
					</button>
				</div>
			</div>
			{#if check}
  			{#key check}
    			<RelayCheck {url} />
  			{/key}
			{/if}
			<div class="card-actions justify-between mt-6">
				<button class="btn btn-neutral" onclick={goBack}>
					Go back
				</button>
				<button
					class="btn btn-primary"
					disabled={!url.trim()}
					onclick={addRelay}
				>
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>Add relay
				</button>
			</div>
		</div>
	</div>
</div>
