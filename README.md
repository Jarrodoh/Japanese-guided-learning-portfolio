# Jarrod Oh's GL E-Portfolio

A modern e-portfolio website built with React and Tailwind CSS for documenting a Guided Learning journey focused on Japanese language and nightlife culture.

## Features

- 🎨 Modern glassmorphism UI design
- 🌙 Dark/Light mode support
- 📱 Fully responsive
- ⚡ Fast with Vite
- 🎬 Smooth animations with Framer Motion
- 📁 Evidence library with search and filters
- 📤 Evidence upload functionality

## Pages

1. **Home** - Overview with progress tracker and featured items
2. **Intro** - Self-introduction, project documents, and learning resources
3. **Plan** - 17-week timeline with weekly activities
4. **Language** - Japanese language learning evidence
5. **Culture** - Nightlife culture research findings
6. **Reflection** - Personal reflections and self-assessment
7. **Deliverables** - Complete evidence library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the project folder
cd eportfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Deploying to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy

## Customizing Content

### Update Your Information

Most content is stored in the page components. Key files to update:

- **`src/pages/Home.jsx`** - Featured items, progress percentage
- **`src/pages/Intro.jsx`** - Self-introduction, documents, resources
- **`src/pages/Plan.jsx`** - Weekly timeline data
- **`src/pages/Language.jsx`** - Language learning evidence
- **`src/pages/Culture.jsx`** - Culture research evidence
- **`src/pages/Reflection.jsx`** - Reflection responses
- **`src/pages/Deliverables.jsx`** - All evidence items

### Adding Documents

Place your PDF documents in `public/docs/` and reference them like:
```javascript
src: '/docs/your-document.pdf'
```

### Adding Images

Either use external URLs (like Unsplash) or place images in `public/media/` and reference them like:
```javascript
src: '/media/your-image.jpg'
```

## Project Structure

```
eportfolio/
├── public/
│   ├── docs/           # PDF documents
│   ├── media/          # Images and videos
│   └── favicon.svg
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Layout.jsx
│   │   ├── GlassCard.jsx
│   │   ├── MediaCard.jsx
│   │   ├── MediaModal.jsx
│   │   ├── Timeline.jsx
│   │   ├── PageBackground.jsx
│   │   ├── SectionHeader.jsx
│   │   └── EvidenceUploader.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Intro.jsx
│   │   ├── Plan.jsx
│   │   ├── Language.jsx
│   │   ├── Culture.jsx
│   │   ├── Reflection.jsx
│   │   └── Deliverables.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── vercel.json
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Lucide React** - Icons

## License

This project is for educational purposes as part of the Global Learning programme at Temasek Polytechnic.
