# Comparative Analysis of SSR, CSR and Hybrid Rendering Approaches

This project implements and compares **three different frontend rendering strategies** using the **same backend API**:

- **Server-Side Rendering (SSR)** — built with **Phoenix LiveView**
- **Client-Side Rendering (CSR)** — built with **React.js (Vite)**
- **Hybrid Rendering** — built with **Next.js**

The goal of the project is to evaluate performance, developer experience, scalability, SEO benefits and overall trade-offs between the three approaches.

---

## 📁 Project Structure

```
root/
  event-booking/                  # Spring Boot API
  event-booking-csr/             # React CSR application
  event-booking-hybrid/          # Next.js hybrid application
  event_booking_ssr/             # Phoenix LiveView SSR application
```

---

# 🚀 How to Run the Project

Below are instructions for running **all three frontends** and the **backend**.

---

# 🟦 1. Backend (Spring Boot)

**Location:** `event-booking/`

**Environment variables**
In order to run the backend, you will need to add the following environment variables:

```bash
DB_URL=
DB_USERNAME=
DB_PASSWORD=
```

You can create a `.env` file in the `event-booking/` folder with these values, or export them in your terminal before running the app.

**Start the backend:**

```bash
cd event-booking
docker compose up --build
```

**URL:**

```
http://localhost:8080
```

The backend exposes REST endpoints consumed by all three frontends.

---

# 🟨 2. Client-Side Rendering (React + Vite)

**Location:** `event-booking-csr/`

**Install dependencies:**

```bash
cd event-booking-csr
npm install
```

**Start the app:**

```bash
npm run dev
```

**URL:**

```
http://localhost:5173
```

React fetches all data from the backend and renders everything in the browser.

---

# 🟪 3. Hybrid Rendering (Next.js)

**Location:** `event-booking-hybrid/`

**Install dependencies:**

```bash
cd event-booking-hybrid
npm install
```

**Start the app:**

```bash
npm run dev
```

**URL:**

```
http://localhost:3000
```

Next.js mixes SSR and CSR depending on the page and usage of server/client components.

---

# 🟥 4. Server-Side Rendering (Phoenix LiveView)

**Location:** `event_booking_ssr/`

**Install dependencies:**

```bash
cd event_booking_ssr
mix deps.get
npm install --prefix assets
```

**Start the Phoenix SSR app:**

```bash
mix phx.server
```

**URL:**

```
http://localhost:4000
```

Phoenix LiveView renders UI on the server while maintaining real-time state using WebSockets.

---

# 🤝 Contributions

This project is a part of a master's thesis comparing modern rendering approaches.

---