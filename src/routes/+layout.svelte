<script lang="ts">
	import '../app.css';
	import { displayProfile, displayRelayUrl } from '@welshman/util'
	import { deriveProfile, pubkey } from '@welshman/app'
	import { userRelays, encodeRelay, selectedRelay } from '$lib/state';
	import { login, logout } from '$lib/commands';

	let { children } = $props();

	const profile = deriveProfile($pubkey)
</script>

<div class="bg-base-100 min-h-screen">
	<header class="navbar bg-base-300">
  	<div class="container mx-auto flex justify-between items-center px-4">
			<a href="/" class="font-bold text-xl">Landlubber</a>
  		<div>
    		{#if $pubkey}
    			<div class="flex items-center gap-2">
    				<div class="avatar">
    					<div class="w-8 rounded-full overflow-hidden">
      					{#if $profile?.picture}
      						<img src={$profile.picture} alt={displayProfile($profile)} />
    						{:else}
        					<div class="w-8 h-8 bg-base-300"></div>
    						{/if}
    					</div>
    				</div>
    				<div class="dropdown dropdown-end">
    					<div tabindex="0" role="button" class="btn btn-ghost btn-sm">
    						<span class="text-sm">{displayRelayUrl($selectedRelay) || 'No relay selected'}</span>
    						<svg
    							class="h-4 w-4 fill-current"
    							xmlns="http://www.w3.org/2000/svg"
    							viewBox="0 0 20 20"
    						>
    							<path
    								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    							/>
    						</svg>
    					</div>
    					<ul
    						tabindex="0"
    						class="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow gap-1"
    					>
    						{#each $userRelays.sort() as relay (relay)}
  								<li>
  									<a href="/relays/{encodeRelay(relay)}" class="justify-start text-sm" class:bg-base-300={relay === $selectedRelay}>
  										{displayRelayUrl(relay)}
  									</a>
  								</li>
    						{/each}
    						<li>
    							<a href="/relays/new" class="justify-start text-sm">Add Relay</a>
    						</li>
    						<div class="divider my-1"></div>
    						<li>
    							<button class="justify-start text-sm" onclick={logout}>Log out</button>
    						</li>
    					</ul>
    				</div>
    			</div>
    		{:else}
  				<button class="btn btn-primary" onclick={login}>Log In with Nostr</button>
    		{/if}
  		</div>
  	</div>
	</header>
	<main class="container mx-auto p-4">
  	{#if $pubkey}
  		{@render children()}
		{:else}
  		<div class="my-20 text-center flex flex-col gap-8">
    		<p>Please log in to get started.</p>
    		<div>
  				<button class="btn btn-primary" onclick={login}>Log In with Nostr</button>
    		</div>
  		</div>
		{/if}
	</main>
</div>
