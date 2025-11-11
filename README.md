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

## 🔐 Authentication

Certain endpoints require an **API key** to perform administrative actions.

Include the key in the `Authorization` header (or `x-api-key`) when updating a report’s status.

Example:

```bash
curl -X PUT https://statusboard-s9h9.onrender.com/reports/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: supersecretkey123" \
  -d '{"status":"RESOLVED"}'

Response:
{
  "id": 1,
  "service": "Customer Portal",
  "title": "Login failure for valid users",
  "description": "Users receive 500 error when submitting the login form.",
  "status": "RESOLVED",
  "createdAt": "2025-11-10T23:13:42.000Z",
  "updatedAt": "2025-11-11T19:22:03.000Z"
}

```
---

## 🔎 Filtering Reports

You can filter reports by status or service name using query parameters.

Exmples:
```bash
GET /reports?status=OPEN
GET /reports?service=Portal
GET /reports?status=INVESTIGATING&service=API
```

## 🧩 Environment Variables

Backend (`backend/.env`):

```env
DATABASE_URL="file:./dev.db"
PORT=4000
ADMIN_TOKEN=supersecretkey123
```

Frontend (deployment):

```env
VITE_API_BASE_URL=https://your-backend-url
```

These variables are used for:

- Database connection (Prisma)
- Configurable server port
- Admin-only status update protection
- Pointing the frontend to the correct API (local or production)

---

## ⚙️ Running Locally

### 1️⃣ Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init_reports
npm run dev
```

Runs at: `http://localhost:4000`

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at: `http://localhost:5173`

Optional `frontend/.env` for local:

```env
VITE_API_BASE_URL=http://localhost:4000
```

---

## 🌐 Deployment (Suggested Setup)

### Backend (Render)

- Root Directory: `backend`
- Build Command:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

- Start Command:

```bash
node dist/index.js
```

- Environment Variables:
  - `DATABASE_URL`
  - `ADMIN_TOKEN`
  - `PORT` (optional, Render sets one by default)

### Frontend (Vercel)

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:
  - `VITE_API_BASE_URL` → URL of the backend deployed on Render

---

## 🧠 Learning Highlights

This project demonstrates:

- Clean **Express + TypeScript** architecture.
- **Prisma ORM** with a real data model and migrations.
- Environment-based configuration using **dotenv**.
- Centralized error handling and structured logging.
- Simple but real **API key auth** for admin operations.
- Query parameter filtering for flexible data access.
- Separation of concerns between backend and frontend.
- End-to-end deployment of a fullstack app.

---

## 🔍 Example Workflow

1. User submits a new incident from the React dashboard.
2. Backend validates input and stores it via Prisma in SQLite.
3. Admin/support updates the report status using the protected endpoint.
4. Frontend reflects the updated status in the incident list.

---

## 🏁 Future Improvements

- JWT-based authentication and user roles.
- Pagination and sorting for large datasets.
- PostgreSQL for production deployments.
- Automated tests (Jest/Vitest).
- WebSocket or SSE for live updates.
- Swagger/OpenAPI documentation.

---

## 📜 License

MIT License — feel free to fork, adapt, and build on top of this project.
## 🧑‍💻 Author

**Julián Andrés Gaitán Hernández**  
Junior Software Engineer / Game & Backend Developer  
📍 Bucaramanga, Colombia  
📧 [juliangaitan_h@hotmail.com](mailto:juliangaitan_h@hotmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/gaitanjulian-gamedeveloper)

---

⭐️ *If you found this project interesting, consider starring the repo — it helps visibility and shows support.*
