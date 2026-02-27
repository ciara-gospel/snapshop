# ImageBrowser - Interactive Image Gallery

> A modern web application to discover, explore, and download high-quality images via the Pexels API.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Project Goals](#project-goals)
3. [Tech Stack](#tech-stack)
4. [Technical Architecture](#technical-architecture)
5. [Features](#features)
6. [Screenshots](#screenshots)
7. [Live Demo](#live-demo)
8. [Installation](#installation)
9. [Challenges Faced](#challenges-faced)
10. [What I Learned](#what-i-learned)
11. [Future Improvements](#future-improvements)

---

## Problem Statement

### Who has the problem?

Developers, designers, content creators, and individuals who need high-quality images for their projects. Traditionally, finding free and legal images required browsing multiple websites, often with unintuitive interfaces and limited download options.

### Why it matters?

- **Wasted time**: Traditional image search methods take a lot of time
- **License issues**: Many images found on the web have usage restrictions
- **Inconsistent quality**: Search results often vary in quality
- **Poor user experience**: Existing sites can be ad-heavy or difficult to navigate

### Why this solution exists?

ImageBrowser solves these problems by providing a modern, intuitive interface that:
- Aggregates thousands of professional-quality images via the Pexels API
- Enables instant keyword-based search
- Offers downloads in multiple sizes
- Displays similar image recommendations to discover related content

---

## Project Goals

1. **Create a modern, responsive** user interface for image browsing
2. **Integrate Pexels API** to fetch high-quality images
3. **Implement a powerful search** system with real-time results
4. **Enable image downloads** in multiple resolutions
5. **Display recommendations** of similar images based on the photographer
6. **Provide a smooth user experience** with transitions and visual feedback

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 19 |
| **Build Tool** | Vite 6 |
| **Routing** | React Router DOM 7 |
| **API** | Pexels API |
| **Icons** | React Icons 5.5 |
| **Language** | JavaScript (ES6+) |
| **Styling** | CSS3 |

---

## Technical Architecture

### Frontend Structure

```
src/
├── App.jsx                 # Main entry point with routing
├── main.jsx               # React application bootstrap
├── index.css              # Global styles
├── components/
│   ├── Header.jsx         # Main navigation
│   ├── Gallery.jsx        # Image grid display
│   ├── ImageCard.jsx      # Individual image card
│   └── SearchBar.jsx      # Search bar component
├── pages/
│   ├── HomePage.jsx       # Home page with preview
│   ├── GalleryPage.jsx    # Main gallery with search
│   └── ImageDetailsPage.jsx # Details and download page
├── context/
│   └── ImageContext.jsx   # Global image state management
└── services/
    └── api.js             # Pexels API communication
```

### Backend Structure

This project uses a **Backend-less** architecture:
- The Pexels API serves as the sole data source
- All requests are made directly from the client
- No local database is required

### Database

- **Provider**: Pexels API (external database)
- **Stored Data**: Images, metadata (photographer, dimensions, URLs)
- **Cache**: React state (Context API) for the current session

### API Communication

```
Client React <-Pexels API
     |
     ├── GET /v1/curated (trending images)
     ├── GET /v1/search?query=xxx (search)
     └── GET /v1/photos/:id (image details)

Authentication: API Key in HTTP headers
```

---

## Features

### Request Management

- **Asynchronous requests** using `fetch` and `async/await`
- **Error handling** with try/catch and alert messages
- **Loading states** with visual indicators (Loading...)
- **URL cleanup** with `URL.revokeObjectURL()` after download

### Validation

- **Input validation**: Search term sanitization
- **Response validation**: HTTP status checking (200 OK)
- **Missing image handling**: "Image not found" message

### Security

- **Secure API key**: Stored on client side (Pexels API limitation)
- **Secure downloads**: Using `blob` to prevent injections
- **Sanitization**: User data is escaped before display

### Responsive Design

- **Flexible grid**: CSS Grid with `minmax()` for adaptation
- **Responsive images**: Loading appropriate sizes based on screen
- **Mobile navigation**: Adaptive icons and buttons
- **Touch-friendly**: Buttons large enough for touch screens

### Core Features

| Feature | Description |
|---------|-------------|
| **Image Search** | Real-time keyword-based search |
| **Dynamic Gallery** | 30 images displayed per page |
| **Featured Images** | "Curated" section on startup |
| **Complete Details** | Display dimensions and photographer |
| **Multi-size Downloads** | Small (640px), Medium (1280px), Large (1920px), Original |
| **Similar Images** | Suggestions based on photographer |
| **Intuitive Navigation** | React Router routes with smooth navigation |

---

## Screenshots

### Home Page
```
+-----------------------------------------+
|  ImageBrowser                       [Home|Gallery] |
+-----------------------------------------+
|                                         |
|         Welcome to ImageBrowser         |
|   Discover amazing images and...       |
|                                         |
|  +----+ +----+ +----+ +----+ +----+    |
|  |    | |    | |    | |    | |    |    |
|  +----+ +----+ +----+ +----+ +----+    |
|                                         |
|         [ Start Browsing ]              |
+-----------------------------------------+
```

### Gallery Page
```
+-----------------------------------------+
|  ImageBrowser                       [Home|Gallery] |
+-----------------------------------------+
|  Gallery                                |
|  +---------------------------------+    |
|  | Search images...                 |    |
|  +---------------------------------+    |
|                                         |
|  +------+ +------+ +------+ +------+    |
|  |      | |      | |      | |      |    |
|  | Photo| | Photo| | Photo| | Photo|    |
|  +------+ +------+ +------+ +------+    |
|  ...                                     |
+-----------------------------------------+
```

### Details Page
```
+-----------------------------------------+
|  ImageBrowser                       [Home|Gallery] |
+-----------------------------------------+
|                                         |
|         [Large Image Display]           |
|                                         |
|  Photographer: John Doe                 |
|  Dimensions: 4000 x 3000                |
|                                         |
|  [Small v] [Download]                   |
|                                         |
|  Similar Images                         |
|  +----+ +----+ +----+ +----+           |
|  +----+ +----+ +----+ +----+           |
|                                         |
|         [ Previous ]                    |
+-----------------------------------------+
```

---

## Live Demo

> NOTE: The application requires a valid Pexels API key to function. Currently, the API key in the code is a demo key.

**Deployment URL**: https://snapshop-eta.vercel.app/

To test locally, see the [Installation](#installation) section.

---

## Installation

### Prerequisites

- Node.js (version 18+)
- npm or yarn

### Installation Steps

1. **Clone the project**
   ```bash
   git clone https://github.com/ciara-gospel/snapshop.git
   cd snapshop
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Pexels API Key** (optional)
   
   The project already includes a built-in Pexels API key. To use your own key:
   
   Edit the file `src/services/api.js`:
   ```javascript
   const API_KEY = 'YOUR_API_KEY';
   ```

   Get a free API key at: [Pexels API](https://www.pexels.com/api/)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Go to: `http://localhost:5173`

### Available Commands

| Command | Description |
|----------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Challenges Faced

### 1. API Key Management

- **Problem**: The API key is exposed in the client code
- **Solution**: Inherent limitation of public client-side APIs; could consider a proxy server for production

### 2. Image Loading

- **Problem**: Large images slowed down the experience
- **Solution**: Implemented size-based loading (small/medium/large) based on display context

### 3. Global Image State

- **Problem**: Need to share images between multiple pages
- **Solution**: Using React Context API (`ImageContext`) for state management

### 4. Cross-Origin Downloads

- **Problem**: CORS restrictions when downloading directly
- **Solution**: Using `fetch` + `blob` to retrieve and download images

### 5. Network Error Handling

- **Problem**: API can return errors (rate limiting, network issues)
- **Solution**: try/catch with friendly error message display

---

## What I Learned

### Technical Skills

1. **React 19** - In-depth understanding of Hooks (useState, useEffect, useContext)
2. **React Router v7** - Declarative navigation with Routes and dynamic parameters
3. **REST API** - Communication with external API via fetch
4. **State Management** - Context API for data sharing between components
5. **Modern CSS** - Using CSS Grid, Flexbox, and CSS variables

### Best Practices

1. **Code Organization** - Clear and reusable project structure
2. **Error Handling** - Appropriate try/catch and loading states
3. **Performance** - Query and render optimization
4. **Responsive Design** - Mobile-first approach

### Concepts Learned

- Modern Frontend Architecture (SPA with Vite)
- Third-party API Integration (Pexels)
- React Design Patterns (Context, Hooks)
- Frontend Security Best Practices

---

## Future Improvements

### Short Term (v1.1)

- [ ] **Pagination** - Add navigation between result pages
- [ ] **Favorites** - Image saving system (localStorage)
- [ ] **Advanced filters** - Filter by color, orientation

### Medium Term (v2.0)

- [ ] **Dark mode** - Dark theme for better night-time experience
- [ ] **Search history** - Save recent searches
- [ ] **Mobile optimization** - PWA (Progressive Web App)

### Long Term (v3.0)

- [ ] **Custom backend** - API proxy to secure the key
- [ ] **User database** - Authentication and user accounts
- [ ] **Collections** - Create custom collections
- [ ] **Social integration** - Share on social networks

---

## License

This project is for educational purposes. Images are provided by [Pexels](https://www.pexels.com/) under free license.

---

## Acknowledgments

- [Pexels](https://www.pexels.com/) for the image API
- [React](https://react.dev/) for the framework
- [Vite](https://vitejs.dev/) for the development tooling

---

<div align="center">

Built with by [Your Name]

</div>
