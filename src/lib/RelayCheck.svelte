<script lang="ts">
	import { sleep } from '@welshman/lib';
	import { ManagementMethod } from '@welshman/util';
	import { deriveRelay, manageRelay } from '@welshman/app';
	import { SocketStatus, AuthStatus } from '@welshman/net';
	import { deriveSocket } from '$lib/state';

	const { url } = $props();

	const relay = deriveRelay(url);
	const socket = deriveSocket(url);

	let loading = $state(true);
	let connected = $state(false);

	$effect(() => {
		if ($socket?.status === SocketStatus.Open) {
			connected = true;
		}
	});

	sleep(3000).then(() => {
		loading = false;
	});

	$socket?.attemptToOpen();
</script>

<div class="w-full">
	<table class="table-sm table">
		<tbody>
			<tr>
				<td class="text-left">Found relay profile</td>
				<td class="w-16 text-center">
					{#if $relay?.profile}
						<span class="text-success font-bold">✓</span>
					{:else if loading}
						<span class="loading loading-xs opacity-50"></span>
					{:else}
						<span class="text-error font-bold">✗</span>
					{/if}
				</td>
			</tr>
			<tr>
				<td class="text-left">Connected to relay</td>
				<td class="w-16 text-center">
					{#if connected}
						<span class="text-success font-bold">✓</span>
					{:else if loading}
						<span class="loading loading-xs opacity-50"></span>
					{:else}
						<span class="text-error font-bold">✗</span>
					{/if}
				</td>
			</tr>
			<tr>
				<td class="text-left">Authentication status</td>
				<td class="w-16 text-center">
					{#if $socket?.auth.status === AuthStatus.Ok}
						<span class="text-success font-bold">✓</span>
					{:else if loading}
						<span class="loading loading-xs opacity-50"></span>
					{:else if $socket?.auth.status === AuthStatus.None && connected}
						<span class="text-success font-bold">✓</span>
					{:else}
						<span class="text-error font-bold">✗</span>
					{/if}
				</td>
			</tr>
			<tr>
				<td class="text-left">Supports relay management</td>
				<td class="w-16 text-center">
					{#if $relay?.profile?.supported_nips?.includes(86)}
						<span class="text-success font-bold">✓</span>
					{:else if loading && !$relay?.profile}
						<span class="loading loading-xs opacity-50"></span>
					{:else}
						<span class="text-error font-bold">✗</span>
					{/if}
				</td>
			</tr>
			<tr>
				<td class="text-left">Management methods available</td>
				<td class="w-16 text-center">
					{#await manageRelay(url, { method: ManagementMethod.SupportedMethods, params: [] })}
						<span class="loading loading-xs opacity-50"></span>
					{:then { result, error }}
						{#if result?.length > 0}
							<span class="text-success font-bold">✓</span>
						{:else}
							<span class="text-error font-bold">✗</span>
						{/if}
					{:catch}
						<span class="text-error font-bold">✗</span>
					{/await}
				</td>
			</tr>
		</tbody>
	</table>
</div>
