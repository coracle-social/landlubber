import { Nip07Signer } from '@welshman/signer'
import { dropSession, pubkey, loginWithNip07 } from '@welshman/app'

export const login = async () => {
  const pubkey = await new Nip07Signer().getPubkey()

  if (pubkey) {
    loginWithNip07(pubkey)
  } else {
    alert("Unable to log in using NIP 07. Do you have a nostr signer extension installed?")
  }
}

export const logout = () => {
  const $pubkey = pubkey.get()

  if ($pubkey) {
    dropSession($pubkey)
  }

  localStorage.clear()
}

