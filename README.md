# Landlubber

**A NIP 86 Nostr relay manager**

Landlubber is a web application for Nostr relay administrators and moderators. Process user reports, manage user access, and monitor content posted to your relay.

## Usage

1. **Log in with Nostr** - Click "Log In with Nostr" and connect your Nostr identity
2. **Add your first relay** - Click "Add Relay" and enter your relay's WebSocket URL
3. **Test the connection** - Use the built-in connection tester to verify connectivity
4. **Start managing** - Begin monitoring content and managing your relay community

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- A Nostr identity (public/private key pair)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/coracle-social/landlubber.git
   cd landlubber
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`
