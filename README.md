# Website Accessibility Checker

A full-stack web application designed to help developers and business owners check their websites for WCAG compliance. This tool scans any given URL and provides an immediate accessibility score along with actionable insights on how to fix contrast issues, missing aria-labels, and structural warnings.

## Features

- **Instant Scanning**: Enter any valid URL to perform a comprehensive accessibility audit.
- **Detailed Reporting**: Displays a generated score and categorizes issues by severity (e.g., Critical, Serious, Moderate, Minor).
- **Actionable Insights**: Provides suggestions on how to solve the pinpointed accessibility violations.
- **Modern UI**: A responsive, dark-mode-first aesthetic built with React and Tailwind CSS.
- **Powered by Axe-Core**: Utilizes the industry standard `axe-core` and Puppeteer to analyze live web pages in the background.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS v4, Lucide React Icons
- **Backend**: Node.js, Express.js
- **Auditing Engine**: Puppeteer, Axe-Core

## Project Structure

```
├── backend/            # Express.js API & Puppeteer service
│   ├── index.js        # Main server entrypoint
│   ├── package.json
│   └── src/            # Routes, controllers, and services
└── frontend/           # React application
    ├── index.html
    ├── package.json
    ├── src/            # Components, styles (Tailwind config), and App logic
    └── vite.config.js
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/website-accessibility-checker.git
cd website-accessibility-checker
```

### 2. Install dependencies

You will need to install the dependencies for both the frontend and the backend.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Running the App Locally

To start the local development environments, you will need to start both servers. Open two terminal instances:

**Terminal 1 (Backend - Port 5001):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend - Port 5173):**
```bash
cd frontend
npm run dev
```

Finally, open your browser and navigate to `http://localhost:5173`.

## License

This project is licensed under the MIT License.
