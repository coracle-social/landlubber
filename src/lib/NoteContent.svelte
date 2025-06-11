<script lang="ts">
  import {parse, renderAsHtml} from '@welshman/content'

  const {event} = $props()
</script>

{@html renderAsHtml(parse(event)).toString()}
