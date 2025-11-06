<script lang="ts">
	import { page } from '$app/stores';
	import { displayRelayUrl, normalizeRelayUrl } from '@welshman/util';
	import { encodeRelay } from '$lib/state';
	import { selectedRelay } from '$lib/state';

	const { entity } = $page.params;
	const { pathname } = new URL($page.url);

	const buildPath = (section: string) => `/relays/${encodeRelay(entity)}/${section}`;

	selectedRelay.set(normalizeRelayUrl(entity));
</script>

<div class="flex flex-col gap-4">
	<div>
		<h1 class="text-2xl font-bold">Management dashboard</h1>
		<h2 class="opacity-75">For {displayRelayUrl($selectedRelay)}</h2>
	</div>
	<div class="divider -my-2"></div>
	<div class="flex gap-6">
		<nav class="menu border-base-300 w-56 gap-2 border-r border-solid pr-6">
			<a
				href={buildPath('reports')}
				class="rounded-box hover:bg-base-200 flex items-center justify-start gap-4 px-4 py-2 transition-colors"
				class:bg-base-200={pathname.startsWith(buildPath('reports'))}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					></path>
				</svg>
				Reports
			</a>
			<a
				href={buildPath('users')}
				class="rounded-box hover:bg-base-200 flex items-center justify-start gap-4 px-4 py-2 transition-colors"
				class:bg-base-200={pathname.startsWith(buildPath('users'))}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					></path>
				</svg>
				Members
			</a>
			<a
				href={buildPath('users/banned')}
				class="rounded-box hover:bg-base-200 flex items-center justify-start gap-4 px-4 py-2 transition-colors"
				class:bg-base-200={pathname.startsWith(buildPath('users/banned'))}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
					></path>
				</svg>
				Banned Users
			</a>
			<a
				href={buildPath('content')}
				class="rounded-box hover:bg-base-200 flex items-center justify-start gap-4 px-4 py-2 transition-colors"
				class:bg-base-200={pathname.startsWith(buildPath('content'))}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
					></path>
				</svg>
				All Content
			</a>
			<a
				href={buildPath('rooms')}
				class="rounded-box hover:bg-base-200 flex items-center justify-start gap-4 px-4 py-2 transition-colors"
				class:bg-base-200={pathname.startsWith(buildPath('rooms'))}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
					></path>
				</svg>
				Chat Rooms
			</a>
		</nav>
		<main class="flex min-w-0 flex-1 flex-col gap-4">
			<slot />
		</main>
	</div>
</div>
