# CodeFlash - Micro Learning Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Accessibility](https://img.shields.io/badge/Accessibility-95%2B-green)
![Platform](https://img.shields.io/badge/Platform-Web-brightgreen)

A lightweight, browser-based application designed to help developers quickly review HTML, CSS, and JS concepts through flashcard-style lessons and quizzes. Built with accessibility and offline capability as core principles.

##  Live Demo

[View Live Site](https://your-username.github.io/codeflash) *[Note: Update with your actual deployment URL]*

##  Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Accessibility](#accessibility)
- [Team](#team)
# CodeFlash - Micro Learning Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Accessibility](https://img.shields.io/badge/Accessibility-95%2B-green)
![Platform](https://img.shields.io/badge/Platform-Web-brightgreen)

A lightweight, browser-based application designed to help developers quickly review HTML, CSS, and JS concepts through flashcard-style lessons and quizzes. Built with accessibility and offline capability as core principles.

## Table of Contents

- [Features](#features)
- [Data file and local dev](#data-file-and-local-dev)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Accessibility](#accessibility)
- [Team](#team)
- [License](#license)

## Features

- Flashcard lessons and short quizzes
- Progress tracking persisted in localStorage
- Search and filter lessons
- Light/Dark theme with accessible contrast

## Data file and local dev

The app reads lesson data from `/data/db.json` relative to the site root. When serving the `public/` directory directly (for example with `http-server` or `nginx`), ensure the data file is available under `public/data/db.json`.

This repository includes a small npm helper that copies the top-level `data/db.json` into `public/data` for local development:

```bash
# copy data into public (also runs automatically before `npm run dev`)
npm run prepare:static
```

Then start the dev server:

```bash
npm run dev
```

## Technology Stack

- HTML5, CSS3 (custom properties), and Vanilla ES6 JavaScript
- Tests: Jest + jsdom
- Dev server: http-server (npm)
- Optional: Docker + nginx for containerized hosting

## Project Structure

```
codeflash/
├── public/            # Web root served by http-server or nginx
│   ├── index.html
│   ├── css/
│   └── js/
├── data/              # Source data (copy into public/data for dev)
│   └── db.json
├── .github/workflows/ # CI configuration
├── tests/             # Jest unit tests
└── package.json
```

## Installation

Prerequisites: Node.js 16+

```bash
git clone https://github.com/Mutai11/CODEFLASH-.git
cd CODEFLASH-
npm install
```

## Development

Prepare static data and start the dev server:

```bash
npm run prepare:static
npm run dev
# visit http://localhost:3000
```

Run tests:

```bash
npm test
```

## Accessibility

- WCAG 2.1 AA focused; keyboard navigation and screen-reader friendly markup.

## Team

- Melvin Mutai — Project lead

## License

MIT — see the LICENSE file for details
# Access at http://localhost:3000

