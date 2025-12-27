HelpStudyAbroad – Frontend Technical Assessment
Overview

This project is a Frontend Technical Assessment developed using Next.js (App Router), Material-UI (MUI), Zustand, and NextAuth.
The application integrates public REST APIs from DummyJSON and demonstrates authentication, state management, responsive UI, and performance optimization.

Technology Stack

Next.js (App Router)

Material-UI (MUI)

Zustand (State Management)

NextAuth (Authentication)

DummyJSON Public API

Authentication

Admin login implemented using NextAuth Credentials Provider

JWT-based session handling

Protected routes for Dashboard, Users, and Products

Unauthenticated users are redirected to the login page

Demo Credentials

Username: kminchelle

Password: 0lelplR

Note:
DummyJSON’s authentication endpoint shows inconsistent behavior for server-side credential requests.
To ensure a stable demo authentication flow, a controlled fallback is implemented for the demo user while keeping the NextAuth authentication architecture intact.

Users Module
Features

Users list with API-side pagination

Search functionality

Responsive Material-UI table layout

Single user detail page

State managed using Zustand

APIs Used

GET /users?limit=10&skip=0

GET /users/search?q=…

GET /users/{id}

Products Module
Features

Responsive products grid layout

Search functionality

Category filter dropdown

Pagination

Single product detail page with images and description

State managed using Zustand

APIs Used

GET /products?limit=10&skip=0

GET /products/search?q=…

GET /products/category/{category}

GET /products/{id}

State Management (Zustand)

Zustand was selected for state management because:

Lightweight with minimal boilerplate

Built-in async action support

Suitable for small to medium-scale applications

Simpler and cleaner than Redux for this use case

State managed includes:

Authentication state

Users data

Products data

UI & Responsiveness

Entire UI is built using Material-UI

Responsive layouts implemented using:

Material-UI Grid system

Container and Box components

Flexible layouts without fixed widths

Responsive Pages

Login Page

Users List Page

Products List Page

User Detail Page

Product Detail Page

The application adapts smoothly across mobile, tablet, and desktop screen sizes.

Performance Optimization

API-side pagination to prevent large data loads

useCallback and React.memo used to reduce unnecessary re-renders

Clean separation of UI logic and data handling

Client-Side Caching

API responses cached using Zustand

Prevents repeated API calls for already fetched data

Improves performance and user experience

Project Structure (Summary)

App Router based routing

Modular component structure

Separate Zustand stores for users, products, and authentication

Reusable UI components

Setup Instructions
1. Install Dependencies
npm install

2. Environment Variables

Create a .env.local file in the project root with:

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

3. Run the Application
npm run dev


Open in browser:

http://localhost:3000/login

Project Status

Authentication implemented

Users and Products modules completed

Responsive UI achieved

Zustand state management implemented

Performance optimizations applied

Author

Dheeraj Srivastava
Frontend Developer Intern Applicant
GitHub: https://github.com/Dheeraj-cre
