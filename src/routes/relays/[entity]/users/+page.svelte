<script lang="ts">
	import * as nip19 from 'nostr-tools/nip19';
	import { ManagementMethod } from '@welshman/util';
	import { manageRelay } from '@welshman/app';
	import AllowedUser from '$lib/AllowedUser.svelte';
	import { selectedRelay } from '$lib/state';

	const update = () => key++;

	const addMember = async () => {
		let pubkey = (prompt('Enter member public key (npub or hex):') || '').trim();

		if (pubkey.startsWith('npub')) {
			try {
				pubkey = nip19.decode(pubkey).data as string;
			} catch (e) {
				return alert('Failed to decode pubkey');
			}
		}

		if (!pubkey.match(/[0-9a-f]{64}/)) {
			return alert('Invalid hex pubkey');
		}

		const { error } = await manageRelay($selectedRelay, {
			method: ManagementMethod.AllowPubkey,
			params: [pubkey, '']
		});

		if (error) {
			return alert(`Failed to add member: ${error}`);
		}

		update();
	};

	let key = $state(0);
</script>

<div class="flex items-center justify-between">
	<div>
		<h3 class="text-2xl">Relay Members</h3>
		<p class="opacity-75">View and manage relay members.</p>
	</div>
	<div class="flex justify-end">
		<button onclick={addMember} class="btn btn-primary btn-sm">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
				></path></svg
			>
			Add Member
		</button>
	</div>
</div>
{#key key}
	{#await manageRelay($selectedRelay, { method: ManagementMethod.ListAllowedPubkeys, params: [] })}
		<div class="m-auto flex gap-3 py-20">
			<div class="loading loading-sm"></div>
			Loading...
		</div>
	{:then { error, result }}
		{#if error}
			<p class="py-20 text-center">Failed to load members: {error}</p>
		{:else}
			<div class="flex flex-col gap-4">
				{#each result as { pubkey, reason }, i (pubkey + i)}
					<AllowedUser {pubkey} {reason} />
				{:else}
					<p class="py-20 text-center">No members found!</p>
				{/each}
			</div>
		{/if}
	{:catch}
		<p class="py-20 text-center">Failed to load members.</p>
	{/await}
{/key}
