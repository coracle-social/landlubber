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
			<a href="/" class="font-bold text-4xl flex items-center gap-3" style="font-family: 'Pirata One', serif;">
				<img src="/landlubber.png" alt="Landlubber" class="w-10 h-10 rounded-full border border-solid border-base-content" />
				Landlubber
			</a>
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
    						<span class="text-sm">{$selectedRelay ? displayRelayUrl($selectedRelay) : 'No relay selected'}</span>
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
    							<a href="/relays/new" class="justify-start text-sm"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>Add Relay</a>
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
			<div class="hero py-20">
				<div class="hero-content text-center">
					<div class="max-w-md">
						<h1 class="text-5xl font-bold mb-4" style="font-family: 'Pirata One', serif;">
							Welcome aboard!
						</h1>
						<p class="text-lg mb-6">
							Landlubber is your trusty mate for managing Nostr relays. Keep watch over your content, manage user access, and maintain order across the decentralized seas.
						</p>
						<div class="grid grid-cols-1 gap-4 text-left mb-6">
							<div class="flex items-start gap-3">
								<div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
									<svg class="w-3 h-3 text-primary-content" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
									</svg>
								</div>
								<div>
									<h3 class="font-semibold">Content Management</h3>
									<p class="text-sm opacity-70">Monitor and moderate content across your relays</p>
								</div>
							</div>
							<div class="flex items-start gap-3">
								<div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
									<svg class="w-3 h-3 text-primary-content" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
									</svg>
								</div>
								<div>
									<h3 class="font-semibold">User Access Control</h3>
									<p class="text-sm opacity-70">Manage user permissions and handle reports</p>
								</div>
							</div>
							<div class="flex items-start gap-3">
								<div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
									<svg class="w-3 h-3 text-primary-content" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
									</svg>
								</div>
								<div>
									<h3 class="font-semibold">Relay Monitoring</h3>
									<p class="text-sm opacity-70">Keep track of multiple relays from one dashboard</p>
								</div>
							</div>
						</div>
    				<button class="btn btn-primary mt-8" onclick={login}>Get Started</button>
					</div>
				</div>
			</div>
		{/if}
	</main>
</div>
