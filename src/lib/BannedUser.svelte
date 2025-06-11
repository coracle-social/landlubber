<script lang="ts">
  import {deriveProfileDisplay, manageRelay} from '@welshman/app'
  import {formatTimestamp} from '@welshman/lib'
  import {getTag, ManagementMethod} from '@welshman/util'
  import {deriveEvent} from '$lib/state'
  import NoteContent from '$lib/NoteContent.svelte'
  import NoteCard from '$lib/NoteCard.svelte'

  const {url, pubkey, reason} = $props()

  const profileDisplay = deriveProfileDisplay(pubkey)

  const restoreUser = async () => {
    const {error, result} = await manageRelay(url, {
      method: ManagementMethod.AllowPubkey,
      params: [pubkey, "Restored by moderator"],
    })

    if (error) {
      alert(`Failed to restore user: ${error}`)
    } else {
      banned = false
    }
  }

  const banUser = async () => {
    const {error, result} = await manageRelay(url, {
      method: ManagementMethod.BanPubkey,
      params: [pubkey, reason],
    })

    if (error) {
      alert(`Failed to ban user: ${error}`)
    } else {
      banned = true
    }
  }

  let banned = $state(true)
</script>

<div class="card bg-base-200">
  <div class="card-body flex flex-row justify-between items-center gap-4">
    @{$profileDisplay} has been banned for {reason || "no reason"}
    {#if banned}
      <button class="btn btn-sm btn-neutral" onclick={restoreUser}>Restore user</button>
    {:else}
      <button class="btn btn-sm btn-neutral btn-outline" onclick={banUser}>Ban user</button>
    {/if}
  </div>
</div>
