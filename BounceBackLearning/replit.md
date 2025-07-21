# Bounce Back Academy - Educational Platform

## Overview

Bounce Back Academy is a comprehensive educational platform designed specifically for NBSE (Nagaland Board of Secondary Education) students. Built as a full-stack web application, it provides free access to previous year question papers, educational videos, and study resources for classes 8-12. The platform was created by a student for students, emphasizing accessibility and ease of use.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Session Management**: Express sessions with PostgreSQL storage
- **File Handling**: Multer for PDF uploads
- **API Design**: RESTful API with structured error handling

### Development Setup
- **Monorepo Structure**: Client, server, and shared code in single repository
- **Hot Reload**: Vite dev server with HMR
- **TypeScript**: Strict type checking across entire codebase
- **Path Aliases**: Configured for clean imports

## Key Components

### Database Schema
- **Users**: Admin authentication system
- **Question Papers**: PDF storage with metadata (class, subject, year, phase)
- **Videos**: YouTube video links with categorization
- **Feedback**: User feedback and newsletter subscriptions
- **Admin Sessions**: Session management for admin panel

### Authentication System
- Session-based authentication for admin panel
- Simple login/logout flow
- Protected routes for administrative functions

### File Management
- PDF upload handling with validation
- File size limits (10MB maximum)
- PDF-only file type restrictions
- Local file storage system

### Content Management
- CRUD operations for question papers
- Video management with YouTube integration
- Feedback collection and management
- Advanced filtering and search capabilities

## Data Flow

### Client-Server Communication
1. **API Requests**: RESTful endpoints for all data operations
2. **File Uploads**: Multipart form data for PDF uploads
3. **Real-time Updates**: React Query for automatic data synchronization
4. **Error Handling**: Structured error responses with user-friendly messages

### Content Delivery
1. **Question Papers**: Filtered by class, subject, year, and exam phase
2. **Videos**: Categorized by class and subject with view tracking
3. **Search & Filter**: Advanced filtering system for easy content discovery
4. **Download System**: Direct PDF download functionality

### Admin Workflow
1. **Authentication**: Session-based login system
2. **Content Management**: Add/edit/delete question papers and videos
3. **Analytics**: Basic statistics dashboard
4. **Feedback Review**: Manage user feedback and inquiries

## External Dependencies

### Core Dependencies
- **Database**: Drizzle ORM with PostgreSQL (Neon serverless)
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React and React Icons
- **Validation**: Zod for schema validation
- **Date Handling**: date-fns for date utilities

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety
- **CSS**: Tailwind CSS with PostCSS
- **Linting**: ESLint configuration
- **Database Migrations**: Drizzle Kit

### Third-party Integrations
- **YouTube**: Video embedding and thumbnail generation
- **File Storage**: Local file system (scalable to cloud storage)
- **Session Storage**: PostgreSQL-based session storage

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to static files
2. **Backend Build**: ESBuild bundles server code
3. **Asset Optimization**: Automatic minification and optimization
4. **Type Checking**: TypeScript compilation verification

### Production Configuration
- **Environment Variables**: Database URL and session secrets
- **Static File Serving**: Express serves built React app
- **Database Connection**: Serverless PostgreSQL connection
- **Error Handling**: Production-ready error middleware

### Scalability Considerations
- **Database**: Uses connection pooling for efficient database access
- **File Storage**: Currently local, designed for easy migration to cloud storage
- **Session Management**: PostgreSQL-based sessions for horizontal scaling
- **API Design**: RESTful structure allows for easy microservice migration

### Performance Optimizations
- **Code Splitting**: Vite automatically splits code for optimal loading
- **Image Optimization**: YouTube thumbnails with fallback handling
- **Caching**: React Query provides intelligent caching
- **Bundle Size**: Tree-shaking and modern build optimizations

The application follows a clean architecture pattern with clear separation between frontend, backend, and shared utilities, making it maintainable and scalable for future enhancements.