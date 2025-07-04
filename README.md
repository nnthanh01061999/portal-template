# CMI Admin Portal

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/nnthanh01061999/portal-template)

A modern, internationalized admin portal built with Next.js 15, TypeScript, Tailwind CSS, and Ant Design Pro Components.

## Features

- Next.js 15 with App Router and Turbopack
- TypeScript for type safety
- Tailwind CSS for utility-first styling
- Ant Design Pro components for enterprise-level UI
- Internationalization with next-intl (English and Vietnamese)
- Responsive admin layout with mobile support
- Authentication with token-based system (access token and refresh token)
- React Query for data fetching and state management
- Zustand for client-side state management with cookie persistence
- Form components with validation
- Responsive data tables with mobile view support
- Proper error handling with custom 404 and 500 pages

## Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nnthanh01061999/portal-template.git
cd portal-template
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp env.example .env.local
```

4. Run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
portal-template/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── [locale]/           # Internationalized routes
│   │   │   ├── (admin)/        # Admin route group (protected)
│   │   │   │   ├── dashboard/  # Dashboard page
│   │   │   │   └── template/   # Template management pages
│   │   │   ├── login/          # Login page (public)
│   │   │   ├── not-found.tsx   # 404 page
│   │   │   └── layout.tsx      # Locale-specific layout
│   │   ├── globals.css         # Global styles
│   │   ├── global-error.tsx    # Global error handler
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── common/             # Common components
│   │   ├── formats/            # Data formatting components
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Layout components
│   │   ├── locale/             # Locale components
│   │   ├── providers/          # Context providers
│   │   └── table/              # Table components with responsive design
│   ├── configs/                # Configuration files
│   │   ├── api/                # API endpoints configuration
│   │   └── routes/             # Route configuration
│   ├── constants/              # Application constants
│   ├── helpers/                # Helper functions
│   │   ├── cookies/            # Cookie management
│   │   ├── date/               # Date utilities
│   │   ├── fetch/              # Fetch API utilities
│   │   ├── form/               # Form utilities
│   │   └── permission.ts       # Permission utilities
│   ├── hooks/                  # Custom React hooks
│   │   └── query/              # React Query hooks
│   ├── i18n/                   # Internationalization configuration
│   ├── lib/                    # Library utilities
│   ├── middleware.ts           # Next.js middleware for auth and i18n
│   ├── stores/                 # State management with Zustand
│   │   ├── adapters/           # Store adapters (cookie, localStorage)
│   │   └── stores/             # Store definitions
│   ├── theme/                  # Theme configuration
│   ├── types/                  # TypeScript type definitions
│   │   └── model/              # Data models
│   └── utils/                  # Utility functions
├── messages/                   # Translation files
│   ├── en.json                 # English translations
│   └── vi.json                 # Vietnamese translations
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.ts              # Next.js configuration
└── package.json                # Project dependencies
```

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Ant Design](https://ant.design/) - UI component library
- [Ant Design Pro Components](https://procomponents.ant.design/) - Enterprise-level UI components
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization for Next.js
- [React Query](https://tanstack.com/query/latest) - Data fetching and state management
- [Zustand](https://github.com/pmndrs/zustand) - Client-side state management
- [Day.js](https://day.js.org/) - Date manipulation library
- [Jest](https://jestjs.io/) - Testing framework
- [Firebase](https://firebase.google.com/) - Push notifications

## Authentication

The application uses a token-based authentication system with:

- Access token for API requests
- Refresh token for obtaining new access tokens
- Cookie-based storage for persistence
- Route protection via middleware

Protected routes require authentication, and unauthenticated users are redirected to the login page.

## Firebase Push Notifications

The application supports push notifications using Firebase Cloud Messaging (FCM):

### Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Add a web app to your Firebase project
3. Enable Firebase Cloud Messaging in your project
4. Get your Firebase configuration and VAPID key
5. Update your `.env.local` file with your Firebase configuration:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your-vapid-key
```

### Features

- Browser push notifications for both foreground and background states
- Notification permission request button in the admin interface
- Automatic token generation and storage
- Token management through Zustand store with cookie persistence

### Implementation Details

- Firebase initialization in `src/lib/firebase.ts`
- Service worker for background notifications in `public/firebase-messaging-sw.js`
- Notification provider in `src/components/providers/firebase-provider.tsx`
- Custom hook for notification management in `src/hooks/use-firebase-notification.ts`

### Backend Integration

To send notifications from your backend to specific users:

1. Store the FCM token in your user database when received from the frontend
2. Use the Firebase Admin SDK in your backend to send notifications to specific tokens
3. Include notification payload with title, body, and any additional data

## Internationalization

The application supports multiple languages using next-intl:

- English (en) - Default
- Vietnamese (vi)

Translation files are stored in the `messages/` directory, and the current locale is part of the URL path.

## Error Handling

The application includes custom error pages:

- `not-found.tsx` - Custom 404 page
- `global-error.tsx` - Global error handler for 500 errors

## Scripts

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality
- `pnpm test` - Run Jest tests
- `pnpm format` - Format code with Prettier
- `pnpm test:watch` - Run Jest tests in watch mode
- `pnpm test:coverage` - Generate test coverage report
- `pnpm coverage:open` - Open test coverage report

## Deployment

### Production Build

To create a production build:

```bash
pnpm build
```

The build output will be in the `.next` directory.

### Docker

A Dockerfile is included for containerized deployment:

```bash
# Build the Docker image
docker build -t portal-template .

# Run the container
docker run -p 3000:3000 portal-template
```

## Troubleshooting

### Common Issues

#### Redirect Loop on Not Found Pages

If you encounter a redirect loop on not-found pages (307 errors):

1. Check that `not-found.tsx` is properly configured as a server component
2. Verify that the middleware correctly handles not-found routes
3. Ensure not-found routes are included in public paths

#### Authentication Issues

If you're experiencing authentication problems:

1. Check that your API endpoints are correctly configured
2. Verify that cookies are being properly set and read
3. Ensure the middleware is correctly checking authentication status

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
