<script lang="ts">
  import {sleep} from '@welshman/lib'
  import {ManagementMethod} from '@welshman/util'
  import {deriveRelay, manageRelay} from '@welshman/app'
  import {SocketStatus, AuthStatus} from '@welshman/net'
  import {deriveSocket} from '$lib/state'

  const {url} = $props()

  const relay = deriveRelay(url)
  const socket = deriveSocket(url)

  let loading = $state(true)
  let connected = $state(false)

  $effect(() => {
    if ($socket?.status === SocketStatus.Open) {
      connected = true
    }
  })

  sleep(3000).then(() => {
    loading = false
  })

  $socket?.attemptToOpen()
</script>

<div class="w-full">
  <table class="table table-sm">
    <tbody>
      <tr>
        <td class="text-left">Found relay profile</td>
        <td class="text-center w-16">
          {#if $relay?.profile}
            <span class="text-success font-bold">✓</span>
          {:else if loading}
            <span class="loading loading-xs opacity-50"></span>
          {:else}
            <span class="text-error font-bold">✗</span>
          {/if}
        </td>
      </tr>
      <tr>
        <td class="text-left">Connected to relay</td>
        <td class="text-center w-16">
          {#if connected}
            <span class="text-success font-bold">✓</span>
          {:else if loading}
            <span class="loading loading-xs opacity-50"></span>
          {:else}
            <span class="text-error font-bold">✗</span>
          {/if}
        </td>
      </tr>
      <tr>
        <td class="text-left">Authentication status</td>
        <td class="text-center w-16">
          {#if $socket?.auth.status === AuthStatus.Ok}
            <span class="text-success font-bold">✓</span>
          {:else if loading}
            <span class="loading loading-xs opacity-50"></span>
          {:else if $socket?.auth.status === AuthStatus.None && connected}
            <span class="text-success font-bold">✓</span>
          {:else}
            <span class="text-error font-bold">✗</span>
          {/if}
        </td>
      </tr>
      <tr>
        <td class="text-left">Supports relay management</td>
        <td class="text-center w-16">
          {#if $relay?.profile?.supported_nips?.includes(86)}
            <span class="text-success font-bold">✓</span>
          {:else if loading && !$relay?.profile}
            <span class="loading loading-xs opacity-50"></span>
          {:else}
            <span class="text-error font-bold">✗</span>
          {/if}
        </td>
      </tr>
      <tr>
        <td class="text-left">Management methods available</td>
        <td class="text-center w-16">
          {#await manageRelay(url, {method: ManagementMethod.SupportedMethods, params: []})}
            <span class="loading loading-xs opacity-50"></span>
          {:then {result, error}}
            {#if error || !result?.length}
              <span class="text-error font-bold">✗</span>
            {:else}
              <span class="text-success font-bold">✓</span>
            {/if}
          {/await}
        </td>
      </tr>
    </tbody>
  </table>
</div>
