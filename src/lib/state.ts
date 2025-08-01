import * as nip19 from 'nostr-tools/nip19';
import { derived } from 'svelte/store';
import {
	load,
	Pool,
	SocketEvent,
	Socket,
	AuthStateEvent,
	defaultSocketPolicies,
	makeSocketPolicyAuth
} from '@welshman/net';
import { custom, synced, localStorageProvider, deriveEvents } from '@welshman/store';
import { always, on, call } from '@welshman/lib';
import { normalizeRelayUrl, getIdFilters } from '@welshman/util';
import type { StampedEvent, TrustedEvent } from '@welshman/util';
import { Router } from '@welshman/router';
import { appContext, repository, signer } from '@welshman/app';

appContext.dufflepudUrl = 'https://dufflepud.onrender.com';

Router.configure({
	getIndexerRelays: always([
		'wss://purplepag.es/',
		'wss://relay.damus.io/',
		'wss://relay.nostr.band/',
		'wss://indexer.coracle.social/'
	])
});

defaultSocketPolicies.push(
	makeSocketPolicyAuth({
		sign: (event: StampedEvent) => signer.get()?.sign(event),
		shouldAuth: (socket: Socket) => true
	})
);

export const IMGPROXY_URL = 'https://imgproxy.coracle.social';

export const dufflepud = (path: string) => appContext.dufflepudUrl + '/' + path;

export const imgproxy = (url: string, { w = 640, h = 1024 } = {}) => {
	if (!url || url.match('gif$')) {
		return url;
	}

	url = url.split('?')[0];

	try {
		return url ? `${IMGPROXY_URL}/x/s:${w}:${h}/${btoa(url)}` : url;
	} catch (_e) {
		return url;
	}
};

export const entityLink = (entity: string) => `https://coracle.social/${entity}`;

export const eventLink = (event: TrustedEvent, relays: string[]) =>
	entityLink(nip19.neventEncode({ id: event.id, relays }));

export const pubkeyLink = (pubkey: string, relays = Router.get().FromPubkeys([pubkey]).getUrls()) =>
	entityLink(nip19.nprofileEncode({ pubkey, relays }));

export const userRelays = synced<string[]>({
  key: 'userRelays',
  defaultValue: [],
  storage: localStorageProvider,
});

export const selectedRelay = synced<string>({
  key: 'selectedRelay',
  defaultValue: '',
  storage: localStorageProvider,
});

export const encodeRelay = (url: string) =>
	encodeURIComponent(
		normalizeRelayUrl(url)
			.replace(/^wss:\/\//, '')
			.replace(/\/$/, '')
	);

export const decodeRelay = (url: string) => normalizeRelayUrl(decodeURIComponent(url));

export const deriveSocket = (url: string) =>
	custom<Socket>((set) => {
		const pool = Pool.get();
		const socket = pool.get(url);

		set(socket);

		const subs = [
			on(socket, SocketEvent.Error, () => set(socket)),
			on(socket, SocketEvent.Status, () => set(socket)),
			on(socket.auth, AuthStateEvent.Status, () => set(socket))
		];

		return () => subs.forEach(call);
	});

export const deriveEvent = (idOrAddress: string, hints: string[] = []) => {
	let attempted = false;

	const filters = getIdFilters([idOrAddress]);
	const relays = [...hints, ...Router.get().options.getIndexerRelays!()];

	return derived(
		deriveEvents(repository, { filters, includeDeleted: true }),
		(events: TrustedEvent[]) => {
			if (!attempted && events.length === 0) {
				load({ relays, filters });
				attempted = true;
			}

			return events[0];
		}
	);
};
