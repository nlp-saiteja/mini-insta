# Lab 2 - React Tutorial: Building SLU-stagram

**Course:** CSCI-4360 / CSCI-5360: Web Technologies  
**Student:** Leela Phanidhar Sai Teja Nalanagula  
**Banner ID:** 001304595

## Part 0 - Project Setup

### What is Vite?

Vite is a modern frontend build tool that provides a faster and leaner development experience. It serves source files over native ES modules, enabling instant server start and Hot Module Replacement (HMR) for quick updates during development.

### Installation Commands Executed

**Command breakdown**

- `npm create vite@latest mini-insta -- --template react` → downloads Vite’s scaffolder and creates a new React 18 project.
- `cd mini-insta` → changes directory into the new project.
- `npm i` → installs React, React-DOM, Vite and other dependencies listed in `package.json`.
- `npm run dev` → launches the local dev server (usually http://localhost:5173/) with hot-module replacement (HMR).

Development Server Running
The application is successfully running at: http://localhost:5173/

![Part 0 – Dev Server Running](screenshots/Part_0_Server_running.png)

Verified main.jsx Uses createRoot
Confirmed that src/main.jsx contains the React 18 setup:
![Part 0 – main.jsx Uses createRoo](screenshots/Part_0_create_root.png)
