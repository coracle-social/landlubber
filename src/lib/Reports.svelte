<script lang="ts">
	import { onMount } from 'svelte';
	import { uniqBy, sleep, sortBy } from '@welshman/lib';
	import { REPORT } from '@welshman/util';
	import type { TrustedEvent } from '@welshman/util';
	import { makeRelayFeed, makeKindFeed, makeIntersectionFeed } from '@welshman/feeds';
	import { makeFeedController } from '@welshman/app';
	import { makeScroller } from '$lib/util';
	import ReportCard from '$lib/ReportCard.svelte';

	const { url } = $props();

	const removed = $state<string[]>([]);

	const ctrl = makeFeedController({
		useWindowing: true,
		feed: makeIntersectionFeed(makeRelayFeed(url), makeKindFeed(REPORT)),
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

<div>
	<h3 class="text-2xl">Reports</h3>
	<p class="opacity-75">View and process reports submitted by users.</p>
</div>
<div class="scroll-container flex flex-col gap-4" bind:this={element}>
	{#await sleep(1000)}
		<div class="m-auto flex gap-3 py-20">
			<div class="loading loading-sm"></div>
			Loading...
		</div>
	{:then}
		{#each events as event (event.id)}
			{#if !removed.includes(event.id)}
				<ReportCard {url} {event} onremove={() => removed.push(event.id)} />
			{/if}
		{:else}
			<p class="py-20 text-center">No reports found!</p>
		{/each}
	{/await}
</div>
