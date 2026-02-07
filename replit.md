# Vet Van Fleet

## Overview

Vet Van Fleet is a bold, modern single-page web application that serves as a platform for promoting free veterinary care for cats. The project positions itself as a "system hack" - reverse-engineering tax loopholes, grants, and corporate write-offs to fund animal welfare rather than functioning as a traditional charity.

The application is built as a full-stack TypeScript project with a React frontend and Express backend, following a monorepo structure with shared code between client and server.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-driven architecture with:
- Pages in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Utility functions in `client/src/lib/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for TypeScript execution
- **API Pattern**: RESTful routes prefixed with `/api`
- **Storage Layer**: Abstracted storage interface (`IStorage`) with in-memory implementation, designed for easy database swap

The server uses a modular structure:
- `server/index.ts` - Application entry point and middleware setup
- `server/routes.ts` - API route definitions
- `server/storage.ts` - Data persistence abstraction
- `server/vite.ts` - Development server integration
- `server/static.ts` - Production static file serving

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts`
- **Validation**: Zod schemas auto-generated from Drizzle schemas via drizzle-zod
- **Current Tables**: Users table with id, username, password fields

### Design System
The project follows specific design guidelines documented in `design_guidelines.md`:
- Typography: Inter (primary), Space Grotesk (accent headlines)
- Color scheme: HSL-based CSS variables with light/dark mode support
- Spacing: Tailwind utility classes with 4px base unit
- Philosophy: Bold, rebellious, modern - breaking from traditional nonprofit aesthetics

### Build Configuration
- Development: Vite dev server with HMR proxied through Express
- Production: 
  - Client built with Vite to `dist/public/`
  - Server bundled with esbuild to `dist/index.cjs`
  - Selective dependency bundling for optimized cold starts

## External Dependencies

### UI Framework
- **Radix UI**: Full suite of accessible, unstyled primitives (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-configured component implementations using Radix + Tailwind
- **Lucide React**: Icon library

### Data & State
- **TanStack React Query**: Server state management and caching
- **React Hook Form + Zod**: Form handling with schema validation

### Database
- **Drizzle ORM**: TypeScript-first SQL ORM
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **connect-pg-simple**: Session storage for PostgreSQL

### Development Tools
- **Vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Production server bundling
- **Drizzle Kit**: Database migrations and schema push

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling integration
- **@replit/vite-plugin-dev-banner**: Development environment indicator