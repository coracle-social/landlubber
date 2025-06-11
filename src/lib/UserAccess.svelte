<script lang="ts">
	import { sleep } from '@welshman/lib';
	import { ManagementMethod } from '@welshman/util';
	import { manageRelay } from '@welshman/app';
	import BannedUser from '$lib/BannedUser.svelte';

	const { url } = $props();
	const promise = Promise.all([
		sleep(1000),
		manageRelay(url, {
			method: ManagementMethod.ListBannedPubkeys,
			params: []
		})
	]);
</script>

<div>
	<h3 class="text-2xl">User Management</h3>
	<p class="opacity-75">View and manage banned users.</p>
</div>
{#await promise}
	<div class="m-auto flex gap-3 py-20">
		<div class="loading loading-sm"></div>
		Loading...
	</div>
{:then [_, { error, result }]}
	{#if error}
		<div class="rounded-box bg-danger text-danger-content p-4">
			Failed to load banned users: {error}
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each result as { pubkey, reason } (pubkey)}
				<BannedUser {url} {pubkey} {reason} />
			{:else}
				<p class="py-20 text-center">No banned users found!</p>
			{/each}
		</div>
	{/if}
{/await}
