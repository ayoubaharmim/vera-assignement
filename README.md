# Vera Assignment – Streaming AI (Expo + TypeScript)

This project is a mobile technical assignment built with **Expo**, **React Native**, and **TypeScript**.  
It demonstrates **real-time Server-Sent Events (SSE)** streaming and incremental UI updates.

## Features
- **Chunk-by-chunk SSE streaming** using `XMLHttpRequest` (`fetch()` cannot stream in React Native).
- **Live incremental rendering** of streamed text.
- **Tag parsing** for `<drug>...</drug>`, `<guideline>...</guideline>`, etc.
- **Collapsible sections** for tagged content.
- **Markdown rendering** for plain text.
- **Clean light UI** matching the assignment mockups.


## Install & Run

```bash
npm install
npm start
```

## Structure

```bash
src/
hooks/useFetchSSE.ts # XHR SSE stream hook
utils/segments.ts # tag parser → segments
components/
Collapsible.tsx
ThinkingIndicator.tsx
App.tsx
```

## Prerequisites

- Node.js >= 18 (or the version required by the project)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ayoubaharmim/vera-assignement.git
cd vera-assignement
```

2. Install dependencies:

```bash
npm install
# or
# yarn install
```
