<script lang="ts">
	import { deriveProfileDisplay } from '@welshman/app';
	import { pubkeyLink } from '$lib/state';

	const { pubkey } = $props();
	const profileDisplay = deriveProfileDisplay(pubkey);
</script>

<a href={pubkeyLink(pubkey)} target="_blank" class="text-primary cursor-pointer">
	@{$profileDisplay}
</a>
