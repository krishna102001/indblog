<h1>IND BLOG</h1>

## Overview

IND BLOG is online blog platform where user can post their thought and share research paper.
To Build IND BLOG we have used `React.js` for Frontend, `Hono.js` for Serverless Backend, `NeonDB` for Database.

## Features

- User can login/register
- User can view the blog
- User can like/unlike the blog
- User can publish their own blog

## Technology Used

- React.js
- Hono.js
- PostgreSQL(NeonDB)
- Cloudinary
- TailWindCSS

## Getting Started

1. Clone the repository and navigate to the directory:

   ```bash
   git clone https://github.com/krishna102001/indblog.git
   ```

### Frontend

2. In terminal run the command:

   ```bash
   cd frontend
   npm i
   ```

3. Create a `.env` files in root directory and add the following environment variables:

   ```env
   VITE_BACKEND_URL=
   ```

4. Start the frontend server:

   ```bash
   npm run dev
   ```

   The frontend server should now be running on `http://localhost:5173`.

### Backend

5. In terminal run the command:

   ```bash
   cd backend
   npm i
   ```

6. Create a `.env` files in root directory and add the following environment variables:

   ```env
    DATABASE_URL=
   ```

7. Put your Secret also in `wrangler.jsonc` file.

   ````env
   "DATABASE_URL":
   "JWT_SECRET":
   "CLOUDINARY_API_KEY":
   "CLOUDINARY_API_SECRET":
   "CLOUDINARY_CLOUD_NAME":
    ```

   ````

8. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend server should now be running on `http://localhost:*****`.
