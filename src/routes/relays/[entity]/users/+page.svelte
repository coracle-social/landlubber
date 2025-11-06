<script lang="ts">
	import { sleep } from '@welshman/lib';
	import { ManagementMethod } from '@welshman/util';
	import { manageRelay } from '@welshman/app';
	import AllowedUser from '$lib/AllowedUser.svelte';
	import { selectedRelay } from '$lib/state';

	const promise = Promise.all([
		sleep(600),
		manageRelay($selectedRelay, {
			method: ManagementMethod.ListAllowedPubkeys,
			params: []
		})
	]);
</script>

<div>
	<h3 class="text-2xl">Relay Members</h3>
	<p class="opacity-75">View and manage relay members.</p>
</div>
{#await promise}
	<div class="m-auto flex gap-3 py-20">
		<div class="loading loading-sm"></div>
		Loading...
	</div>
{:then [_, { error, result }]}
	{#if error}
		<p class="py-20 text-center">Failed to load members: {error}</p>
	{:else}
		<div class="flex flex-col gap-4">
			{#each result as { pubkey, reason } (pubkey)}
				<AllowedUser {pubkey} {reason} />
			{:else}
				<p class="py-20 text-center">No members found!</p>
			{/each}
		</div>
	{/if}
{:catch}
	<p class="py-20 text-center">Failed to load members.</p>
{/await}
