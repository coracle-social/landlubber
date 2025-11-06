<script lang="ts">
	import { deriveProfileDisplay, manageRelay } from '@welshman/app';
	import { ManagementMethod } from '@welshman/util';
	import { selectedRelay } from '$lib/state';
	import ProfileLink from '$lib/ProfileLink.svelte'

	const { pubkey, reason } = $props();

	const profileDisplay = deriveProfileDisplay(pubkey);

	const removeUser = async () => {
		const { error } = await manageRelay($selectedRelay, {
			method: ManagementMethod.DisallowPubkey,
			params: [pubkey, '']
		});

		if (error) {
			alert(`Failed to remove user: ${error}`);
		}
	};

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

	let banned = $state(false);
</script>

<div class="card bg-base-200">
	<div class="card-body flex flex-row items-center justify-between gap-4">
  	<div class="flex gap-1">
    	<ProfileLink {pubkey} />
    	{#if reason}
      	is {reason}
    	{/if}
  	</div>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-sm">
				Actions <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					></path></svg
				>
			</div>
			<ul
				tabindex="0"
				class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
			>
				{#if banned}
					<li><button onclick={restoreUser}>Restore user</button></li>
				{:else}
					<li><button onclick={removeUser}>Remove user</button></li>
					<li><button onclick={banUser} class="text-error">Ban user</button></li>
				{/if}
			</ul>
		</div>
	</div>
</div>
