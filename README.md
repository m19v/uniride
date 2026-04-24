# UniRide - Student-to-Student Ride Sharing

UniRide is a student-to-student ride-sharing app designed to connect students who need rides to campus with student drivers. This is a frontend-only prototype built for demo purposes.

## Features (Prototype)
- **Mock Authentication**: Sign in as Alice (Rider) or Ben (Driver).
- **Rider Flow**: Create ride requests, view matched offers, and book rides.
- **Driver Flow**: View booked rides and mark them as completed.
- **Mocked Persistence**: Uses `localStorage` to persist ride status across sessions.
- **Responsive Design**: Built with React, Tailwind CSS, and Lucide Icons.

## Demo Script
1.  **Open the App**: Navigate to the [live demo](https://mrustamov.github.io/uniride/).
2.  **Sign in as Alice**: Use `alice@example.com` to sign in as a Rider.
3.  **Create a Request**: Click "Create New Request", enter a pickup location (e.g., "42 Elm St"), and confirm.
4.  **View Offers**: You will see a matched offer from "Ben Torres" for $2.50. Click "Book".
5.  **Sign in as Ben**: Logout and sign in as `ben@example.com` (Driver).
6.  **Complete Ride**: Under "Your Recent Activity", find the accepted ride and click "Mark as Completed".
7.  **Check Status**: Logout and sign back in as Alice to see the "COMPLETED" status.

## Tech Stack
- **Frontend**: React (Vite + TypeScript)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router (HashRouter)
- **Deployment**: GitHub Pages (GitHub Actions)

## Local Development
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Project Context
For more technical details, refer to `GEMINI.md`.
