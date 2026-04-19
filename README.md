# Zara Challenge — Mobile Phone Catalog

A phone catalog web app built as a technical challenge. Browse phones, filter by color, view specs, and manage a cart.

## Features

- Search phones by name or brand with debounced input
- Filter by color via interactive swatches
- Phone detail page with storage and color selectors
- Similar products horizontal scroll
- Persistent cart via `localStorage`
- Responsive layout — mobile, tablet, desktop

## Tech stack

- **Next.js 16** (App Router) with **React 19**
- **TypeScript**
- **CSS Modules** with CSS custom properties
- **Jest** + **React Testing Library** for unit and component tests

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_API_KEY=your_api_key_here
```

The app fetches data from `https://prueba-tecnica-api-tienda-moviles.onrender.com`.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |

## Project structure

```
src/
├── app/
│   ├── (home)/          # Home page — search + phone grid
│   ├── phone/[id]/      # Phone detail page
│   ├── cart/            # Cart page
│   ├── layout.tsx       # Root layout with Navbar
│   └── globals.css      # CSS tokens and global styles
├── components/
│   ├── Button/          # Button / Link component
│   ├── ColorSwatch/     # Color selector swatch
│   ├── Navbar/          # Top navigation with cart icon
│   ├── PhoneCard/       # Phone grid card
│   └── ScrollProgress/  # Horizontal scroll progress bar
├── context/
│   └── CartContext.tsx  # Cart state + localStorage persistence
├── services/
│   └── api.ts           # API client with typed responses
├── types/               # Shared TypeScript types
└── utils.ts             # Color utility functions
```

## Tests

```bash
npm test
```

Covers:
- API service (`getPhones`, `getPhoneById`, `ApiError`)
- Cart context (add, remove, persistence, provider guard)
- `Button` component (button vs link rendering, variants, disabled)
- `ColorSwatch` component (selection state, accessibility)
- `PhoneCard` component (rendering, routing)
