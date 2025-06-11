<script lang="ts">
  import {formatTimestamp} from '@welshman/lib'
  import {deriveProfileDisplay} from '@welshman/app'
  import {parse, renderAsHtml} from '@welshman/content'

  const {event} = $props()
  const profileDisplay = deriveProfileDisplay(event.pubkey)
</script>

<div class="flex flex-col gap-2">
  <div class="flex justify-between items-center">
    <div class="font-bold">@{$profileDisplay}</div>
    <div>{formatTimestamp(event.created_at)}</div>
  </div>
  <div>
    {@html renderAsHtml(parse(event)).toString()}
  </div>
</div>
