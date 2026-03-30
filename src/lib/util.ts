import { sleep } from '@welshman/lib';

export type ScrollerOpts = {
	onScroll: () => any;
	threshold?: number;
	reverse?: boolean;
	delay?: number;
};

export type Scroller = {
	check: () => Promise<void>;
	stop: () => void;
};

export const makeScroller = ({
	onScroll,
	delay = 1000,
	threshold = 2000,
	reverse = false
}: ScrollerOpts) => {
	let done = false;

	const container = document.body;

	const check = async () => {
		if (container) {
			// While we have empty space, fill it
			const { scrollY, innerHeight } = window;
			const { scrollHeight, scrollTop, clientHeight } = container;
			const viewHeight = clientHeight || innerHeight;
			const offset = Math.abs(scrollTop || scrollY);
			const shouldLoad = reverse
				? offset < threshold
				: offset + viewHeight + threshold > scrollHeight;

			// Only trigger loading the first time we reach the threshold
			if (shouldLoad) {
				await onScroll();
			}
		}

		// No need to check all that often
		await sleep(delay);

		if (!done) {
			requestAnimationFrame(check);
		}
	};

	requestAnimationFrame(check);

	return {
		check,
		stop: () => {
			done = true;
		}
	};
};
