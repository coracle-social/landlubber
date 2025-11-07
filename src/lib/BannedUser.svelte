<script lang="ts">
	import { manageRelay } from '@welshman/app';
	import { ManagementMethod } from '@welshman/util';
	import { selectedRelay } from '$lib/state';
	import ProfileLink from '$lib/ProfileLink.svelte';

	const { pubkey, reason } = $props();

	const restoreUser = async () => {
		const { error } = await manageRelay($selectedRelay, {
			method: ManagementMethod.AllowPubkey,
			params: [pubkey, '']
		});

		if (error) {
			alert(`Failed to restore user: ${error}`);
		} else {
			banned = false;
		}
	};

	const banUser = async () => {
		const { error } = await manageRelay($selectedRelay, {
			method: ManagementMethod.BanPubkey,
			params: [pubkey, reason]
		});

		if (error) {
			alert(`Failed to ban user: ${error}`);
		} else {
			banned = true;
		}
	};

	let banned = $state(true);
</script>

<div class="card bg-base-200">
	<div class="card-body flex flex-row items-center justify-between gap-4">
		<ProfileLink {pubkey} />
		has been banned
		{#if reason}
			for {reason}
		{/if}
		{#if banned}
			<button class="btn btn-sm btn-neutral" onclick={restoreUser}>Restore user</button>
		{:else}
			<button class="btn btn-sm btn-neutral btn-outline" onclick={banUser}>Ban user</button>
		{/if}
	</div>
</div>
