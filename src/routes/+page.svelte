<script lang="ts">
	import { displayRelayUrl } from '@welshman/util';
	import { userRelays, selectedRelay, encodeRelay } from '$lib/state';
	import { goto } from '$app/navigation';

	function goToRelay(relay: string) {
		goto(`/relays/${encodeRelay(relay)}`);
	}

	function addNewRelay() {
		goto('/relays/new');
	}
</script>

<div class="mx-auto max-w-4xl">
	{#if $userRelays.length === 0}
		<!-- Empty state with introduction -->
		<div class="py-16 text-center">
			<div class="mx-auto max-w-2xl">
				<h1 class="mb-4 text-4xl font-bold" style="font-family: 'Pirata One', serif;">
					Ready to Set Sail?
				</h1>
				<p class="text-base-content/70 mb-8 text-xl">
					Welcome to your relay management dashboard! To get started, you'll need to connect to at
					least one Nostr relay.
				</p>
				<div class="mb-8 grid gap-6 text-left md:grid-cols-2">
					<div class="card bg-base-200 border-base-300 border">
						<div class="card-body">
							<div class="mb-3 flex items-center gap-3">
								<div class="bg-success/20 flex h-8 w-8 items-center justify-center rounded-lg">
									<svg class="text-success h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<h3 class="text-lg font-semibold">Add Your First Relay</h3>
							</div>
							<p class="text-base-content/70">
								Connect to a Nostr relay by entering its WebSocket URL. We'll test the connection to
								make sure everything works properly.
							</p>
						</div>
					</div>

					<div class="card bg-base-200 border-base-300 border">
						<div class="card-body">
							<div class="mb-3 flex items-center gap-3">
								<div class="bg-info/20 flex h-8 w-8 items-center justify-center rounded-lg">
									<svg
										class="text-info h-4 w-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 class="text-lg font-semibold">Start Managing</h3>
							</div>
							<p class="text-base-content/70">
								Once connected, you'll be able to monitor content, manage users, handle reports, and
								keep your relay community healthy.
							</p>
						</div>
					</div>
				</div>

				<div class="bg-base-100 border-base-300 mb-8 rounded-lg border p-6">
					<div class="grid gap-4 text-sm sm:grid-cols-3">
						<div class="text-center">
							<div class="text-primary font-medium">Monitor Content</div>
							<div class="text-base-content/60">View all notes and events</div>
						</div>
						<div class="text-center">
							<div class="text-primary font-medium">Manage Users</div>
							<div class="text-base-content/60">Ban users and control access</div>
						</div>
						<div class="text-center">
							<div class="text-primary font-medium">Handle Reports</div>
							<div class="text-base-content/60">Review and moderate content</div>
						</div>
					</div>
				</div>

				<button class="btn btn-primary" onclick={addNewRelay}>
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v16m8-8H4"
						/>
					</svg>
					Add Your First Relay
				</button>
			</div>
		</div>
	{:else}
		<!-- Dashboard with relay list -->
		<div class="mb-8">
			<div class="mb-6 flex items-center justify-between">
				<div>
					<h1 class="mb-2 text-3xl font-bold">Relay Dashboard</h1>
					<p class="text-base-content/70">Manage and monitor your connected Nostr relays</p>
				</div>
				<div class="text-right">
					<div class="stat">
						<div class="stat-value text-2xl">{$userRelays.length}</div>
						<div class="stat-desc">Connected {$userRelays.length === 1 ? 'Relay' : 'Relays'}</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Relay Grid -->
		<div class="mb-8 grid gap-4">
			{#each $userRelays.sort() as relay (relay)}
				<div
					class="card bg-base-100 border-base-300 hover:border-primary/30 cursor-pointer border transition-colors"
					onclick={() => goToRelay(relay)}
				>
					<div class="card-body">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4">
								<div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
									<svg
										class="text-primary h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
										/>
									</svg>
								</div>
								<div>
									<h3 class="text-lg font-semibold">{displayRelayUrl(relay)}</h3>
									<p class="text-base-content/60 text-sm">{relay}</p>
								</div>
							</div>
							<div class="flex items-center gap-4">
								{#if relay === $selectedRelay}
									<div class="badge badge-primary badge-sm">Active</div>
								{/if}
								<svg
									class="text-base-content/40 h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="text-center">
			<button class="btn btn-primary" onclick={addNewRelay}>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
				Add Another Relay
			</button>
		</div>
	{/if}
</div>
