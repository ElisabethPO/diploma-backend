# 📱 Bang & Olufsen shop (E-commerce Catalog)

> This project is a fully deployed Full-Stack application featuring an e-commerce product catalog. It is built using a modern JavaScript stack with a custom API built on Node.js/Express.

## 🔗 Live Deployment Links

| Service | Address |
| :--- | :--- |
| **Frontend (Catalog)** |  [🚀 Video Presentation](https://www.loom.com/share/9bca9101cd794e00b63bb6ff1e236f96) |
| **Frontend** | [GitHub](https://github.com/ElisabethPO/Bang-Olufsen-shop)|
| **Backend (API)** | [JSON Data: All Products Endpoint](https://tech-showcase-store.onrender.com/api/products) |

---

## ⚙️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | **HTML5, Pure JavaScript**, CSS (Sass/SCSS), Parcel (Bundler). |
| **Backend** | **Node.js, Express.js** (for creating the RESTful API). |
| **Database** | **MongoDB Atlas** (Cloud-hosted NoSQL Database). |
| **Hosting** | **GitHub Pages** (Frontend), **Render.com** (Backend/API). |

---

## 🌟 Key Features

### User Experience & Design:
* **Fully Responsive:** The layout is adapted for various screen sizes, specifically tested for widths: **320px, 785px, 1200px, and 1400px**.
* **Dynamic Data Loading:** Products are fetched asynchronously from the deployed REST API.
* **Catalog Filtering:** Users can filter products dynamically by category, subcategory, and color.

### Authentication & Admin Features:
* **User Authentication:** Supports **user registration and login** (authorization) via dedicated API endpoints.
* **Admin Panel:** Includes a secure administrative interface for managing products/data.
* **Admin Access Credentials:**
    * **Password:** `admin123` (Note: This is the default or initial password for access)

### Backend (API) Functionality:
* **RESTful Endpoints:** Provides structured endpoints for fetching, filtering, and authenticating users.
* **Data Persistence:** Handles the storage and retrieval of product data, user accounts, and sessions in MongoDB Atlas.

---

## 💻 Local Development Setup

To run this project locally, you need to set up both the backend (API) and the frontend.

### Prerequisites

* Node.js (LTS version recommended)
* MongoDB Atlas Connection String (for the backend)

### 1. Frontend Setup

1.  Clone the repository:
    ```bash
    git clone [YOUR REPO URL]
    cd Bang-Olufsen-shop
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend in development mode (using Parcel):
    ```bash
    npm run frontend
    ```
    *The site will be available locally (e.g., `http://localhost:1234`).*

### 2. Backend/API Setup

* The backend must be run separately (if you want to test the full local loop). **Note:** Your current frontend JS file is hardcoded to use the **Render URL**. If you run the backend locally, you must temporarily change the `API_BASE_URL` in your frontend code to `http://localhost:5000/api`.

---

## 🚀 Deployment and Configuration

### Frontend Deployment (GitHub Pages)

The project uses `gh-pages` and Parcel for automated deployment.

| Command | Description |
| :--- | :--- |
| `npm run frontend:prod` | Builds the production bundle to the `/dist` directory. |
| `npm run deploy` | Executes the build (`predeploy`) and pushes the `/dist` folder to the `gh-pages` branch. |

### Backend Configuration (Render)

The following environment variables were critical for successful deployment on Render:

| Variable | Value | Purpose |
| :--- | :--- | :--- |
| `PORT` | `process.env.PORT` | Uses the port assigned by the hosting environment. |
| `MONGODB_URI` | `mongodb://<user>:<pass>@cluster0-shard-00-00...:27017/test?authSource=admin&ssl=true` | **Full Standard Connection String** (Required to bypass DNS issues on the hosting service). |
| **CORS** | `https://elisabethpo.github.io` | Configured to allow requests only from the deployed GitHub Pages frontend domain. |
