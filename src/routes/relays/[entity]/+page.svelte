<script lang="ts">
	import { page } from '$app/stores';
	import { displayRelayUrl, normalizeRelayUrl } from '@welshman/util';
	import { decodeRelay } from '$lib/state';
	import Reports from '$lib/Reports.svelte';
	import UserAccess from '$lib/UserAccess.svelte';
	import AllContent from '$lib/AllContent.svelte';
	import {selectedRelay} from '$lib/state'

	const { entity } = $page.params;
	const url = normalizeRelayUrl(decodeRelay(entity))
	const navItems = ['Reports', 'User Access', 'All Content'];

	let active = $state('Reports');

	selectedRelay.set(url)
</script>

<div class="flex flex-col gap-4">
	<div>
		<h1 class="text-2xl font-bold">Management dashboard</h1>
		<h2 class="opacity-75">For {displayRelayUrl(url)}</h2>
	</div>
	<div class="divider -my-2"></div>
	<div class="flex gap-6">
		<nav class="menu border-base-300 w-56 gap-2 border-r border-solid pr-6">
			{#each navItems as item (item)}
				<button class="btn" class:btn-active={item === active} onclick={() => (active = item)}>
					{item}
				</button>
			{/each}
		</nav>
		<main class="flex flex-1 flex-col gap-8 min-w-0 overflow-hidden">
			{#if active === 'Reports'}
				<Reports {url} />
			{:else if active === 'User Access'}
				<UserAccess {url} />
			{:else if active === 'All Content'}
				<AllContent {url} />
			{/if}
		</main>
	</div>
</div>
