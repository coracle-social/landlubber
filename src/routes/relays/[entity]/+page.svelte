<script lang="ts">
  import {page} from '$app/stores'
  import {displayRelayUrl} from '@welshman/util'
	import {decodeRelay} from '$lib/state'
	import Reports from '$lib/Reports.svelte'
	import UserAccess from '$lib/UserAccess.svelte'
	import AllContent from '$lib/AllContent.svelte'

  const {entity} = $page.params
  const url = decodeRelay(entity)
  const navItems = ['Reports', 'User Access', 'All Content']

  let active = $state('Reports')
</script>

<div class="flex flex-col gap-4">
  <div>
  	<h1 class="text-2xl font-bold">Management dashboard</h1>
  	<h2 class="opacity-75">For {displayRelayUrl(url)}</h2>
  </div>
  <div class="divider -my-2"></div>
  <div class="flex gap-6">
    <nav class="menu w-56 border-r border-solid border-base-300 gap-2 pr-6">
      {#each navItems as item}
        <button class="btn" class:btn-active={item === active} onclick={() => active = item}>
          {item}
        </button>
      {/each}
    </nav>
    <main class="flex flex-col gap-8 flex-1">
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
