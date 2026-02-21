# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features smooth animations, interactive sections, and a sleek user interface.

## Features

- ⚡ **Fast Performance** - Built with Vite for optimized development and production builds
- 🎨 **Smooth Animations** - Framer Motion for fluid transitions and interactive elements
- 📱 **Responsive Design** - Mobile-first approach for all devices
- 🎯 **Interactive UI** - Intersection Observer for scroll-based animations
- 📊 **Showcase Sections** - Hero, About, Skills, Projects, Timeline, and Contact
- 🌐 **GitHub Pages Ready** - Automated deployment with GitHub Actions

## Tech Stack

- **React 19** - Modern UI library with React Compiler support
- **TypeScript** - Type-safe development
- **Vite 7** - Next-generation build tool
- **Framer Motion** - Animation library
- **React Icons** - Icon system
- **React Intersection Observer** - Scroll-based animations
- **ESLint** - Code quality

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm preview
```

## Deployment

### Automatic Deployment (GitHub Pages)

This project is configured for automatic deployment via GitHub Actions. Simply push to the `main` branch and your site will automatically build and deploy!

**Live Site:** https://your-username.github.io/portfolio/

### Manual Deployment

```bash
npm run deploy
```

This requires `gh-pages` to be installed: `npm install --save-dev gh-pages`

## Project Structure

```
src/
├── components/        # React components
├── styles/           # Global styles
├── utils/            # Utility functions
├── assets/           # Static assets
├── App.tsx           # Main component
├── data.ts           # Content data
└── main.tsx          # Entry point
```

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and deploy to GitHub Pages

## Customization

- Update content in [src/data.ts](src/data.ts)
- Modify styles in [src/styles/globals.css](src/styles/globals.css)
- Edit components in [src/components/](src/components/)

```

```
