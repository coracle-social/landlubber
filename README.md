# 🏴‍☠️ Landlubber

**Your trusty mate for managing Nostr relays**

Landlubber is a comprehensive web application for Nostr relay administrators and moderators. Keep watch over your content, manage user access, and maintain order across the decentralized seas of the Nostr network.

## ✨ Features

### 🔍 Content Management

- **Real-time Content Monitoring** - View and track all content flowing through your relays
- **Note Cards** - Clean, readable display of notes with user profiles and timestamps
- **Content Moderation** - Review and manage problematic content efficiently
- **Event Filtering** - Filter and search through events by type, user, or content

### 👥 User Access Control

- **User Banning** - Block problematic users from your relays
- **Report Management** - Handle user reports and moderation requests
- **Access Permissions** - Control who can post to your relays
- **User Profiles** - View detailed user information and activity history

### ⚡ Relay Management

- **Multi-Relay Dashboard** - Manage multiple relays from a single interface
- **Relay Health Monitoring** - Check connection status and performance
- **Easy Relay Addition** - Simple interface to connect new relays
- **Relay Switching** - Quickly switch between different relays in your network

### 🔐 Security & Authentication

- **Nostr Identity** - Secure login using your Nostr keys
- **Session Management** - Persistent authentication across sessions
- **Permission-based Access** - Role-based access control for different functions

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- A Nostr identity (public/private key pair)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/landlubber2.git
   cd landlubber2
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

### First Time Setup

1. **Log in with Nostr** - Click "Log In with Nostr" and connect your Nostr identity
2. **Add your first relay** - Click "Add Relay" and enter your relay's WebSocket URL
3. **Test the connection** - Use the built-in connection tester to verify connectivity
4. **Start managing** - Begin monitoring content and managing your relay community

## 🛠️ Technology Stack

- **Frontend Framework**: SvelteKit 5 with TypeScript
- **Styling**: Tailwind CSS + DaisyUI components
- **Nostr Integration**: Welshman library suite
- **State Management**: Svelte 5 runes and stores
- **Build Tool**: Vite
- **Testing**: Vitest + Playwright

## 📁 Project Structure

```
src/
├── routes/                 # SvelteKit pages and routing
│   ├── +layout.svelte     # App layout with navigation
│   ├── +page.svelte       # Main dashboard
│   └── relays/            # Relay management pages
├── lib/                   # Shared components and utilities
│   ├── AllContent.svelte  # Content feed component
│   ├── NoteCard.svelte    # Individual note display
│   ├── Reports.svelte     # Report management
│   ├── UserAccess.svelte  # User management
│   ├── commands.ts        # App commands and actions
│   ├── state.ts           # Global state management
│   └── util.ts            # Helper functions
└── app.css               # Global styles
```

## 🔧 Configuration

Landlubber uses environment variables and local storage for configuration:

- **Relay URLs**: Stored in browser local storage
- **User Keys**: Managed securely through Nostr extensions
- **Theme Settings**: Persisted in local storage

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and add tests if applicable
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and TypeScript conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nostr Community** - For building the decentralized future
- **Welshman Library** - Excellent Nostr tooling and utilities
- **SvelteKit Team** - Amazing framework for modern web apps
- **DaisyUI** - Beautiful, semantic component library

## 🆘 Support

- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/your-org/landlubber2/issues)
- **Documentation**: Check the [Wiki](https://github.com/your-org/landlubber2/wiki) for detailed guides
- **Community**: Join the discussion on [Nostr](nostr:npub1234...)

---

_"Not all those who wander are lost, but some relays need a good landlubber to keep them shipshape."_ ⚓
