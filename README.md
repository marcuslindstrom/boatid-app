# BoatID ⛵

> Digital vault for boat owners to manage documents, service history, and maintenance planning.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue)](https://tailwindcss.com/)

## Overview

BoatID is a web application that helps boat owners organize and track everything related to their vessels. Think of it as a digital filing cabinet combined with a maintenance log book.

### Key Features

- 🔐 **Secure Authentication** - Email/password login with Supabase Auth
- ⛵ **Multi-Boat Management** - Manage multiple boats with detailed profiles
- 📄 **Document Vault** - Upload and categorize important documents (manuals, receipts, insurance, registration)
- 🔧 **Service Log** - Track maintenance history with timeline view
- 📅 **Reminders** - Set up maintenance reminders _(coming soon)_
- 💰 **Cost Tracking** - Track and categorize expenses _(coming soon)_

## Screenshots

_Coming soon_

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v3
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Routing**: React Router v6
- **State**: React Context + Custom Hooks

## Quick Start

### Prerequisites

- Node.js 18+
- A Supabase account (free tier works fine)

### Installation

```bash
# Clone the repository
git clone https://github.com/marcuslindstrom/boatid-app.git
cd boatid-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Supabase Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database schema**:
   - Open SQL Editor in Supabase dashboard
   - Copy contents of `supabase-schema.sql`
   - Run the query

3. **Create storage bucket**:
   - Go to Storage
   - Create a new bucket called `documents`
   - Set it to public

4. **Get your credentials**:
   - Go to Settings → API
   - Copy Project URL and anon/public key
   - Update `.env` file

5. **Restart the dev server**

See [DEVELOPMENT_STATUS.md](DEVELOPMENT_STATUS.md) for detailed setup instructions.

## Usage

### Managing Boats

1. Log in or create an account
2. Click "Add Boat" on the home page
3. Fill in boat details (name, make, model, year, HIN)
4. Click "Add Boat"

### Uploading Documents

1. Navigate to "Documents"
2. Select a boat from the dropdown
3. Click "Select File" and choose a PDF or image
4. Select a category (Receipt, Manual, Insurance, etc.)
5. Add optional notes
6. Click "Upload Document"

### Logging Service Events

1. Navigate to "Service Log"
2. Select a boat
3. Click "Add Service Event"
4. Enter date, description, and cost
5. Click "Add Event"

## Project Structure

```
src/
├── components/
│   ├── auth/              # Authentication components
│   ├── boats/             # Boat management
│   ├── documents/         # Document vault
│   ├── layout/            # Header, navigation
│   └── service/           # Service log
├── contexts/
│   └── AuthContext.tsx    # Auth state management
├── hooks/
│   ├── useBoats.ts        # Boat CRUD operations
│   ├── useDocuments.ts    # Document management
│   └── useServiceEvents.ts # Service event CRUD
├── lib/
│   └── supabase.ts        # Supabase client
└── types/
    └── index.ts           # TypeScript types
```

## Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests (coming soon)
npm test
```

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

### Deploy to Netlify

1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables

## Contributing

Contributions are welcome! This is an MVP built for boat owners. Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## Roadmap

- [x] Authentication system
- [x] Boat profile management
- [x] Document vault
- [x] Service log
- [ ] Maintenance reminders
- [ ] Cost tracking with dashboard
- [ ] Seasonal checklists (winter prep)
- [ ] Quick capture (iOS camera integration)
- [ ] Export functionality (PDF, CSV)
- [ ] Mobile app (React Native)

## License

MIT © Marcus Lindström

## Acknowledgments

Built with [Claude Code](https://claude.com/claude-code) - AI-powered development assistant

## Support

For issues or questions:
- Create an issue on GitHub
- See [TESTING_GUIDE.md](TESTING_GUIDE.md) for troubleshooting

---

**Live Demo**: _Coming soon_

**Documentation**: See [DEVELOPMENT_STATUS.md](DEVELOPMENT_STATUS.md) for detailed progress and setup instructions.
