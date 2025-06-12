<script lang="ts">
	import { onMount } from 'svelte';
	import { uniqBy, remove, pluck, sleep, sortBy } from '@welshman/lib';
	import type { TrustedEvent } from '@welshman/util';
	import { ManagementMethod } from '@welshman/util';
	import { makeRelayFeed } from '@welshman/feeds';
	import { makeFeedController, manageRelay } from '@welshman/app';
	import { makeScroller } from '$lib/util';
	import EventRow from '$lib/EventRow.svelte';

	const { url } = $props();

	const ctrl = makeFeedController({
		useWindowing: true,
		feed: makeRelayFeed(url),
		onEvent: (event: TrustedEvent) => buffer.push(event)
	});

	let banned = $state<string[]>([]);
	let removed = $state<string[]>([]);
	let element: Element | undefined = $state();
	let buffer: TrustedEvent[] = $state([]);
	let events: TrustedEvent[] = $state([]);

	onMount(() => {
		const scroller = makeScroller({
			element: element!,
			delay: 300,
			threshold: 3000,
			onScroll: () => {
				buffer = uniqBy(
					(e) => e.id,
					sortBy((e) => -e.created_at, buffer)
				);

				events = uniqBy((e) => e.id, [...events, ...buffer.splice(0, 5)]);

				if (buffer.length < 50) {
					ctrl.load(50);
				}
			}
		});

		manageRelay(url, {
			method: ManagementMethod.ListBannedPubkeys,
			params: []
		}).then(({ result = [] }) => {
			banned = pluck<string>('pubkey', result);
		});

		return () => scroller.stop();
	});
</script>

<div>
	<h3 class="text-2xl">All Content</h3>
	<p class="opacity-75">View and manage all events from this relay.</p>
</div>
<div class="scroll-container flex flex-col gap-4" bind:this={element}>
	{#await sleep(600)}
		<div class="m-auto flex gap-3 py-20">
			<div class="loading loading-sm"></div>
			Loading...
		</div>
	{:then}
		<table class="table-sm table">
			<thead>
				<tr>
					<th>Author</th>
					<th>Kind</th>
					<th>Date</th>
					<th class="hidden lg:table-cell">Content</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each events as event (event.id)}
					{#if !removed.includes(event.id)}
						<EventRow
							{url}
							{event}
							banned={banned.includes(event.pubkey)}
							onban={() => (banned = banned.concat(event.pubkey))}
							onrestore={() => (banned = remove(event.pubkey, banned))}
							onremove={() => (removed = removed.concat(event.id))}
						/>
					{/if}
				{/each}
			</tbody>
		</table>
		{#if events.length === 0}
			<p class="py-20 text-center">No events found!</p>
		{/if}
	{/await}
</div>
