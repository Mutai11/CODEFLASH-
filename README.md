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
- [License](#license)

<<<<<<< HEAD
##  Features
=======
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

## Technologies
>>>>>>> bb2c656 (dev: add prepare script, README note, and CI workflow for tests + smoke checks)

### Core Learning Features
- **Flashcard Lessons**: Bite-sized lessons on web development concepts
- **Interactive Quizzes**: Test your knowledge with immediate feedback
- **Progress Tracking**: Save completed modules locally
- **Search & Filter**: Instant search through all lessons

### Technical Excellence
- **Accessibility First**: WCAG 2.1 AA compliant with full keyboard navigation
- **Offline Capable**: Service Worker caching for offline usage
- **Performance Optimized**: Lighthouse scores >90 across all categories
- **Responsive Design**: Mobile-first approach with seamless desktop experience

### User Experience
- **Dark/Light Theme**: System preference detection with manual toggle
- **Semantic HTML**: Proper document structure for screen readers
- **Focus Management**: Logical tab order and visible focus indicators
- **Skip Navigation**: Quick access to main content for keyboard users

## 🛠 Technology Stack

### Frontend
- **HTML5**: Semantic markup with ARIA landmarks
- **CSS3**: Custom properties, Grid, Flexbox, responsive design
- **JavaScript**: Vanilla ES6+ with modular architecture

### Development & Deployment
- **GitHub Actions**: CI/CD pipeline with automated linting
- **Docker**: Containerized deployment ready
- **Lighthouse**: Automated accessibility and performance testing

### Data Management
- **JSON**: Static data storage for lessons and quizzes
- **LocalStorage**: Client-side progress persistence
- **Service Workers**: Offline functionality and caching

##  Project Structure


codeflash/
├── public/ # Web application root
│ ├── index.html # Homepage
│ ├── views/ # Additional pages
│ │ ├── data.html # Lessons listing
│ │ └── form.html # Suggestion form
│ ├── css/ # Stylesheets
│ │ ├── tokens.css # Design system variables
│ │ └── style.css # Main styles
│ └── js/ # JavaScript modules
│ └── a11y.js # Accessibility features
├── evidence/ # Accessibility documentation
│ ├── lighthouse-*.html # Performance reports
│ ├── html-snippets.md # Code examples
│ └── *.png # Contrast & focus evidence
├── wireframes/ # Design mockups
├── data/ # Application data
│ └── db.json # Lessons and quizzes
├── .github/workflows/ # CI/CD configuration
└── configuration files # Docker, package.json, etc.

text

##  Installation

### Prerequisites
- Node.js 16+ or Docker
- Modern web browser with ES6 support

### Local Development
```bash
# Clone repository
git clone https://github.com/your-username/codeflash.git
cd codeflash

# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:3000
Docker Deployment
bash
# Build and run with Docker
docker-compose up --build

# Access at http://localhost:3000
 Development
Building for Production
bash
# The project is static - no build process required
# Simply deploy the public/ folder to any web server
Running Tests
bash
# Accessibility testing
npm run lighthouse

# HTML validation
npx html-validate public/**/*.html
Code Quality
bash
# Lint CSS
npx stylelint "**/*.css"

# Format code
npx prettier --write .
♿ Accessibility
Compliance Status
WCAG 2.1 AA: Fully compliant

Lighthouse Accessibility: 95-100%

Keyboard Navigation: Complete support

Screen Reader: Optimized for VoiceOver, NVDA, JAWS

Key Accessibility Features
Semantic HTML5 landmarks

ARIA labels and descriptions

Color contrast ratios >4.5:1

Focus management and visible indicators

Skip navigation links

Responsive touch targets (>44px)

Testing Results
Color Contrast: All combinations pass WCAG AA

Keyboard Navigation: Full tab order with visible focus

Screen Readers: Proper landmark navigation

Responsive Design: Mobile-first with breakpoints at 320px, 768px, 1024px

 Team
Development Team
Melvin Mutai - Project Lead & Full-Stack Development

Mark Gikaru - UI/UX Design & Frontend Development

Mark Kiogora - Accessibility Specialist & QA Testing

Roles & Responsibilities
Melvin Mutai: Architecture, core functionality, deployment

Mark Gikaru: User interface, design system, responsive layout

Mark Kiogora: Accessibility compliance, testing, documentation

 License
This project is licensed under the MIT License - see the LICENSE file for details.

