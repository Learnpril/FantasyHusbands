# Overview

Fantasy Hearts is an anime-style dating simulation web application built with a modern React frontend and Express.js backend. Players explore an enchanted forest bordering a grand kingdom, encountering anime-style male characters tied to royal or adventurous roles. The forest serves as neutral ground for intrigue, magic, and romance, with paths that hint at character professions through atmospheric descriptions. The game features 6 unique characters with royal connections, "Veiled Paths" exploration mechanics, character affection systems tied to their roles, and immersive audio-visual elements with court politics undertones.

## Recent Changes

**January 2025 - Royal Theme Integration & Enhanced Forest Journey:**
- Updated all character roles with royal/adventurous themes: Royal Knight (Akira), Court Mage (Felix), Travelling Bard (Dante), Royal Assassin (Kai), Dragon Tamer (Ryuu), Royal Scholar (Zephyr)
- Enhanced Forest Journey paths with job-specific descriptions and atmospheric hints
- Renamed "Forest Archive" to "Forgotten Archives" for better thematic consistency
- Implemented "Veiled Paths" mechanic where exploration hints at character professions without direct reveals
- Added beautiful Fantasy Hearts heart-shaped logo to replace text branding
- Updated mystical forest background with ethereal purple-pink artwork
- Enhanced character discovery system with royal intrigue undertones

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe component development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **UI Components**: Radix UI primitives wrapped in custom components for accessibility and consistency
- **State Management**: Zustand stores for game state, audio management, and user preferences
- **3D Graphics**: React Three Fiber with Drei helpers for potential 3D visual elements
- **Asset Pipeline**: Support for GLTF/GLB models, audio files, and GLSL shaders

## Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Development**: Hot module replacement via Vite integration in development mode
- **Storage**: In-memory storage implementation with database interface for scalability
- **API Design**: RESTful endpoints under `/api` prefix with JSON responses

## Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Drizzle with schema-first approach
- **ORM**: Drizzle ORM with TypeScript schema definitions in shared directory
- **Local Storage**: Browser localStorage for user preferences and game saves
- **Session Management**: Express sessions with connect-pg-simple for database-backed sessions
- **Migration System**: Drizzle Kit for database schema migrations and updates

## Game State Management
- **Core State**: Zustand stores managing game phases, character relationships, and scene progression
- **Persistence**: Local storage integration for save/load functionality with serializable game states
- **Audio System**: Separate audio store managing background music and sound effects with mute controls
- **Settings**: User preferences for volume, text speed, and auto-advance stored persistently

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL provider via `@neondatabase/serverless`
- **Connection**: Environment-based DATABASE_URL configuration for flexible deployment

## UI/UX Libraries
- **Component Library**: Comprehensive Radix UI collection for accessible primitives
- **Styling**: Tailwind CSS with PostCSS processing and custom configuration
- **Icons**: Lucide React for consistent iconography throughout the application
- **Fonts**: Inter font family via Fontsource for typography consistency

## Development Tools
- **TypeScript**: Strict type checking with path mapping for clean imports
- **ESBuild**: Fast bundling for server-side code in production builds
- **TSX**: TypeScript execution for development server without compilation step
- **Error Handling**: Replit-specific error overlay for development debugging

## Audio/Visual Assets
- **3D Rendering**: React Three Fiber ecosystem for WebGL graphics
- **Post-processing**: Three.js post-processing effects for visual enhancement
- **Asset Loading**: Support for various formats including audio files and 3D models
- **Shader Support**: GLSL shader compilation through Vite plugin integration

## Additional Integrations
- **Query Management**: TanStack Query for server state synchronization and caching
- **Utility Libraries**: Class variance authority, clsx, and date-fns for common operations
- **Development Experience**: Runtime error modals and comprehensive TypeScript configuration