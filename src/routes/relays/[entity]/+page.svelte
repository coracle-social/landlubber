<script lang="ts">
	import { page } from '$app/stores';
	import { displayRelayUrl, normalizeRelayUrl } from '@welshman/util';
	import { decodeRelay } from '$lib/state';
	import Reports from '$lib/Reports.svelte';
	import UserAccess from '$lib/UserAccess.svelte';
	import AllContent from '$lib/AllContent.svelte';
	import ChatRooms from '$lib/ChatRooms.svelte';
	import { selectedRelay } from '$lib/state';

	const { entity } = $page.params;
	const url = normalizeRelayUrl(decodeRelay(entity));

	let active = $state('Reports');

	selectedRelay.set(url);
</script>

<div class="flex flex-col gap-4">
	<div>
		<h1 class="text-2xl font-bold">Management dashboard</h1>
		<h2 class="opacity-75">For {displayRelayUrl(url)}</h2>
	</div>
	<div class="divider -my-2"></div>
	<div class="flex gap-6">
		<nav class="menu border-base-300 w-56 gap-2 border-r border-solid pr-6">
			<button class="flex justify-start items-center px-4 py-2 gap-4 rounded-box hover:bg-base-200 transition-colors cursor-pointer" class:bg-base-200={active === 'Reports'} onclick={() => (active = 'Reports')}>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
				</svg>
				Reports
			</button>
			<button class="flex justify-start items-center px-4 py-2 gap-4 rounded-box hover:bg-base-200 transition-colors cursor-pointer" class:bg-base-200={active === 'User Access'} onclick={() => (active = 'User Access')}>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
				</svg>
				User Access
			</button>
			<button class="flex justify-start items-center px-4 py-2 gap-4 rounded-box hover:bg-base-200 transition-colors cursor-pointer" class:bg-base-200={active === 'All Content'} onclick={() => (active = 'All Content')}>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
				</svg>
				All Content
			</button>
			<button class="flex justify-start items-center px-4 py-2 gap-4 rounded-box hover:bg-base-200 transition-colors cursor-pointer" class:bg-base-200={active === 'Chat Rooms'} onclick={() => (active = 'Chat Rooms')}>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
				</svg>
				Chat Rooms
			</button>
		</nav>
		<main class="flex min-w-0 flex-1 flex-col gap-4">
			{#if active === 'Reports'}
				<Reports {url} />
			{:else if active === 'User Access'}
				<UserAccess {url} />
			{:else if active === 'All Content'}
				<AllContent {url} />
			{:else if active === 'Chat Rooms'}
				<ChatRooms {url} />
			{/if}
		</main>
	</div>
</div>
