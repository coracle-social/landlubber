<script lang="ts">
	import { onMount } from 'svelte';
	import { uniqBy, sleep, sortBy } from '@welshman/lib';
	import { GROUP_META } from '@welshman/util';
	import type { TrustedEvent } from '@welshman/util';
	import { makeRelayFeed, makeKindFeed, makeIntersectionFeed } from '@welshman/feeds';
	import { makeFeedController } from '@welshman/app';
	import { makeScroller } from '$lib/util';
	import RoomCard from '$lib/RoomCard.svelte';
	import { encodeRelay} from '$lib/state'

	const { url } = $props();

	const removed = $state<string[]>([]);

	const ctrl = makeFeedController({
		feed: makeIntersectionFeed(makeRelayFeed(url), makeKindFeed(GROUP_META)),
		onEvent: (event: TrustedEvent) => buffer.push(event)
	});

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

		return () => scroller.stop();
	});
</script>

<div class="flex justify-between">
  <div>
  	<h3 class="text-2xl">Chat Rooms</h3>
  	<p class="opacity-75">Manage NIP 29 rooms on this relay.</p>
  </div>
  <a href="/relays/{encodeRelay(url)}/rooms/new" class="btn btn-primary">Add Room</a>
</div>
<div class="scroll-container flex flex-col gap-4" bind:this={element}>
	{#await sleep(600)}
		<div class="m-auto flex gap-3 py-20">
			<div class="loading loading-sm"></div>
			Loading...
		</div>
	{:then}
		{#each events as event (event.id)}
			{#if !removed.includes(event.id)}
				<RoomCard {url} {event} onremove={() => removed.push(event.id)} />
			{/if}
		{:else}
			<p class="py-20 text-center">No rooms found!</p>
		{/each}
	{/await}
</div>
