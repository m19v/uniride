# Project Context: UniRide (Frontend Prototype)

## Overview
Project: UniRide — frontend-only prototype
Goal: Build a static web app connecting students for ride-sharing, deployable to GitHub Pages.
Focus: No backend. Use local mock data, in-memory stores, and `localStorage` to simulate full user flows (Auth, Matching, Rides, Payments).

## Technical Stack
- **Framework**: React (Vite + TypeScript)
- **Styling**: Tailwind CSS
- **Routing**: React Router (HashRouter recommended for GitHub Pages)
- **State Management**: React Context + `localStorage` persistence
- **Maps**: Leaflet + OpenStreetMap (no API keys required)
- **Deployment**: GitHub Pages via GitHub Actions

## Architecture & Conventions
- **Commits**: Strictly follow [Conventional Commits](https://www.conventionalcommits.org/).
- **Mock Service Layer**: All "API" calls must go through a service layer that interacts with an in-memory/localStorage "database" to allow for easy future backend integration.
- **Mobile First**: Design for a responsive, mobile-ready UI.

## Users & Seed Data
1. **student1 (Rider)**: Alice Park (alice@example.com) — phone +1-555-0101 — home "42 Elm St" — preferred pickup 08:00–09:00.
2. **student2 (Driver)**: Ben Torres (ben@example.com) — phone +1-555-0202 — car "Toyota Corolla 2016" — seats 3 — home "18 Maple Ave" — availability 07:30–09:30 — price per rider $2.50.

## Core Features (MVP - Mocked)
- **Auth**: Email/Password login stub, role-based UI (Rider vs Driver).
- **Rider Flow**: Create request, view matched offers (Haversine distance + time overlap), booking request, payment modal (Stripe stub), chat, and ratings.
- **Driver Flow**: Create offer, accept/reject requests, start/complete ride, view mock earnings.
- **Matching**: Client-side logic to filter drivers by distance and time window.
- **Notifications**: In-app toast notifications for status updates.

## Development Workflow
- **Phase 1**: Implement core UI components and mock service layer.
- **Phase 2**: Implement Rider/Driver flows with local state persistence.
- **Phase 3**: Finalize map integration and deployment to GitHub Pages.
- **Verification**: Use the "Demo Script" (Alice requests -> Ben accepts -> Flow completes) to validate the prototype.
