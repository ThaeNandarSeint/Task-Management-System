# Task Management System

This is the Task Management System project, we used Mantine for UI components.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your local machine:

- Node.js

## Getting Started

Follow these steps to set up the project locally:

1. Clone the Repository:

```
git clone git@github.com:ThaeNandarSeint/Task-Management-System.git
```

2. Navigate to the Project Directory:

```
cd Task-Management-System
```

3. Install Dependencies:

```
npm i
```

4. Run in local:

```
npm run dev
```

5. Open in Browser: <br>
   Visit [http://localhost:5173](http://localhost:5173) to view the application in your browser.

## Project Structure

The project directory is structured as follows:

```
.
├── src/                          # Source files
│   ├── assets/                   # Static assets
│   │   ├── icons/                # SVG icons
│   │   └── fonts/                # fonts for UI
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   └── layouts/              # Reusable layout components
│   ├── constants/                # Constants and configurations
│   ├── libs/                     # Utility functions and libraries
│   ├── hooks/                    # Custom hooks
│   ├── features/                 # Application's main features
│   │   ├── users/
│   │   |   ├── api/              # API for current feature
│   │   |   ├── components/       # Necessary components for current feature
│   │   |   ├── schemas/          # Required schemas for current feature
│   │   |   ├── routes/           # Pages for current feature
│   │   |   ├── types.ts          # Types for current feature
│   │   |   └── index.ts
│   ├── providers/                # Context providers
│   ├── App.tsx                   # Application root component
│   ├── main.tsx                  # Entry point for rendering the application
│   └── routes.tsx                # Define application routes
├── node_modules/                 # Project dependencies
├── public/                       # Public assets and HTML template
├── .gitignore                    # Specifies intentionally untracked files to ignore
├── package.json                  # Project manifest and dependencies
├── README.md                     # Project README file
└── ...                           # Other project files and configurations
```

## Working with Icons

- <b>File Format</b>: Ensure that all icons are in SVG format.
- <b>Icon Directory</b>: Place all SVG icons in the assets/icons directory.
- <b>Usage</b>: Utilize the Icon component to display icons throughout the application. Import the desired SVG icon and use it as a component within your UI.

## Code Quality

To maintain code quality and consistency, we use the following tools and standards:

- `ESLint` for code linting.
- `Prettier` for code formatting.
- `Husky` with lint-staged for pre-commit hooks.
