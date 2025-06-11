<script lang="ts">
	import { parse, renderAsHtml } from '@welshman/content';

	const { event } = $props();
</script>

<div class="break-words overflow-wrap-anywhere">
  {@html renderAsHtml(parse(event)).toString()}
</div>
