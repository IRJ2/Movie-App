# Movie App

A modern movie search and discovery app built with React, TypeScript, and Vite.

## Features

- **Search for movies:** Quickly find movies by typing keywords or titles into the search bar. The app fetches and displays relevant results in real time.
- **View movie details:** Scroll to see more information, such as its poster, title, overview, rating, release year, and language.
- **Trending movies:** See a list of the most popular search results, updated dynamically based on user searches.
- **Responsive and fast UI:** The interface is designed to work smoothly and look great on all devices, ensuring a seamless experience whether on desktop or mobile.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Appwrite](https://appwrite.io/) project and API keys (for trending/search count features)
- [TMDB API Key](https://www.themoviedb.org/documentation/api)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd movie-app
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   ```

3. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

5. **Build for production:**

   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Preview the production build:**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## Linting

To check for lint errors, run:

```bash
npm run lint
# or
yarn lint
```

## Project Structure

- `src/` - Main source code (components, assets, styles)
- `public/` - Static assets
- `index.html` - Main HTML file

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Appwrite](https://appwrite.io/) (for backend services)
- [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)

## Setting Up Appwrite

To enable backend features, this project uses [Appwrite](https://appwrite.io/). Follow these steps to set up Appwrite for local development:

1. **Install and Start Appwrite:**

   - Follow the [official Appwrite installation guide](https://appwrite.io/docs/installation) to run Appwrite locally using Docker.

2. **Create a Project:**

   - Log in to the Appwrite console (usually at `http://localhost` or `http://localhost:80`).
   - Click "Create Project" and give it a name (e.g., "Movie App").

3. **Add a Web Platform:**

   - In your Appwrite project, go to "Platforms" and add a new Web platform.
   - Set the hostname to `localhost` and the port to `5173` (or your Vite dev server port).

4. **Create a Database and Collection:**

   - Go to the "Database" section in your Appwrite console.
   - Click "Create Database" and name it `movie`.
   - Inside the `movie` database, create a new collection named `metrics`.

5. **Add Attributes to the `metrics` Collection:**

   - Add the following attributes:
     - `searchTerm` (String, required): The search term used by the user.
     - `count` (Integer): The count or metric value.
     - `poster_url` (Url, required): The URL of the movie poster.
     - `movie_id` (Integer, required): The unique ID of the movie.

6. **Configure Permissions:**

   - Set read and write permissions as needed for your app (e.g., allow users or guests to read/write metrics).

7. **Update Appwrite Configuration in Your Project:**
   - Update your Appwrite endpoint and project ID in your project files (e.g., `src/appwrite.ts`).

---

Refer to the [Appwrite documentation](https://appwrite.io/docs) for more details on configuring collections, attributes, and permissions.

---

Feel free to customize this README for your project needs!
