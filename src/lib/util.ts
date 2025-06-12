import { sleep } from '@welshman/lib';

export type ScrollerOpts = {
	onScroll: () => any;
	element: Element;
	threshold?: number;
	delay?: number;
};

export type Scroller = {
	check: () => Promise<void>;
	stop: () => void;
};

export const makeScroller = ({
	onScroll,
	element,
	delay = 600,
	threshold = 2000
}: ScrollerOpts) => {
	let done = false;

	const container = element.classList.contains('scroll-container')
		? element
		: element.closest('.scroll-container');

	const check = async () => {
		if (container) {
			// While we have empty space, fill it
			const { scrollY, innerHeight } = window;
			const { scrollHeight, scrollTop } = container;
			const offset = Math.abs(scrollTop || scrollY);
			const shouldLoad = offset + innerHeight + threshold > scrollHeight;

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
