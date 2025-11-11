# 🧭 StatusBoard – Incident & Production Support Dashboard

StatusBoard is a fullstack demo application designed to simulate a **Level 3 support / production incident workflow**, built with **Node.js, TypeScript, React, and REST APIs**.

It showcases how to:
- Expose a clean API for incident reports.
- Build a small but realistic support dashboard.
- Structure a project as if it were used for real production support.

This project is part of my portfolio to demonstrate backend, fullstack, and support engineering skills beyond game development.

---

## 🔧 Tech Stack

**Backend**
- Node.js
- TypeScript
- Express
- CORS, Morgan (logging)
- RESTful routes for incident management

**Frontend**
- React
- TypeScript
- Vite
- Fetch-based API client
- Simple, clean dashboard-style UI

(Next steps: DB persistence with Prisma/SQLite or PostgreSQL, auth, Swagger docs – see Roadmap.)

---

## ✨ Main Features

- **Create Incident Reports**
  - Users (or support agents) can submit issues with service name, title, and description.
- **Status Management**
  - Each incident can be updated through realistic states:
    - `OPEN`
    - `INVESTIGATING`
    - `RESOLVED`
- **Support Dashboard**
  - Centralized view of all incidents.
  - Status badges and timestamps for quick triage.
- **API-Driven Frontend**
  - React app fully powered by the backend’s REST API.

These features are intentionally focused on what real support / production teams do: receive incidents, track status, and respond quickly.

---

## 🏗 Project Structure

```
StatusBoard/
├── backend/    # Node.js + TypeScript + Express API
└── frontend/   # React + TypeScript + Vite dashboard
```

**Backend**
- `src/index.ts` – App setup, middleware, routing.
- `src/reportRoutes.ts` – `/reports` endpoints.
- `src/reportStore.ts` – In-memory storage (to be replaced by DB).
- `src/types.ts` – Shared types.

**Frontend**
- `src/App.tsx` – Main layout and dashboard.
- `src/ReportForm.tsx` – New incident form.
- `src/ReportList.tsx` – List and status actions.
- `src/api.ts` – API client.
- `src/types.ts` – Frontend types aligned with backend.
- `src/styles.css` – Custom UI styling.

---

## 🚀 Running the Project Locally

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

The API will be available at:

```text
http://localhost:4000
```

Test health endpoint:

```http
GET / -> { "message": "StatusBoard API running" }
```

---

### 2. Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

By default:

```text
http://localhost:5173
```

The frontend expects the API at:

- `VITE_API_BASE_URL` (if defined), or  
- `http://localhost:4000` by default.

So for local development no extra config is needed.

---

## 🔗 Key API Endpoints

### `GET /reports`
Returns all incident reports.

### `POST /reports`

Body example:

```json
{
  "service": "Customer Portal",
  "title": "Login failure for valid users",
  "description": "Users receive 500 error after submitting the form."
}
```

Returns the created report with metadata.

### `PUT /reports/:id/status`

Body example:

```json
{ "status": "INVESTIGATING" }
```

Updates the status if report exists.

---

## 🧠 Why This Project Matters

This project is intentionally structured to demonstrate:

- Experience with **Node.js + TypeScript** in a clean modular API.
- Integration of a **React + TypeScript** frontend consuming a real backend.
- Understanding of **incident management**, **status flows**, and **support-oriented tooling**.
- Ability to work with **env-based configuration**, HTTP clients, logging, and basic API design.

Planned improvements (Roadmap) are aligned with real-world backend/support roles.

---

## 📌 Roadmap

Planned enhancements to increase production realism:

- ✅ Environment-based API URL (Vite `VITE_API_BASE_URL`)
- ⏳ Persistent storage with Prisma + SQLite/PostgreSQL
- ⏳ Centralized error handling and structured logs
- ⏳ Basic auth simulation for protected actions
- ⏳ Swagger/OpenAPI documentation at `/docs`
- ⏳ Filtering & search for incidents (by service, status)
- ⏳ Simple role-based view (Agent vs Viewer)
- ⏳ Deployment on Render (API) + Vercel/Netlify (frontend)

---

## 🌐 Deployment


- **Frontend:** [https://statusboard.vercel.app](https://statusboard.vercel.app)
- **Backend API:** [https://statusboard-api.onrender.com](https://statusboard-api.onrender.com)

---

## 🧑‍💻 Author

**Julián Andrés Gaitán Hernández**  
Junior Software Engineer / Game & Backend Developer  
📍 Bucaramanga, Colombia  
📧 [juliangaitan_h@hotmail.com](mailto:juliangaitan_h@hotmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/gaitanjulian-gamedeveloper)

---

⭐️ *If you found this project interesting, consider starring the repo — it helps visibility and shows support.*
