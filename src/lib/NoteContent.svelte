<script lang="ts">
	import { parse, renderAsHtml } from '@welshman/content';

	const { event } = $props();
</script>

<div class="note-content wrap-anywhere">
	{@html renderAsHtml(parse(event)).toString()}
</div>
