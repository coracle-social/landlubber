<script lang="ts">
  import {goto} from '$app/navigation'
  import {selectedRelay, encodeRelay} from '$lib/state'

  goto(`/relays/${encodeRelay($selectedRelay)}/reports`)
</script>
