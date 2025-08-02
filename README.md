# CivicTrack

Hello, **Odoo** I am Ayush Singh and I have created CivicTrack.

**CivicTrack** is a community-driven civic issue reporting platform that empowers citizens to easily report and track local problems like potholes, garbage overflow, water leaks, and more—directly from their neighborhood.

Built with modern web technologies, CivicTrack encourages proactive civic participation while maintaining strict locality-based visibility, transparency, and engagement.

---

## Purpose

Many civic issues go unnoticed or unresolved due to lack of awareness and an easy-to-use platform for reporting. CivicTrack bridges this gap by:

- Allowing citizens to report civic issues quickly and easily
- Showing only relevant reports based on the user’s location
- Maintaining transparency through status tracking
- Providing local authorities with tools to manage, verify, and resolve problems efficiently

---

## Key Features

### Issue Reporting

- Report civic issues with:
  - A **title** and **short description**
  - A photo
  - **Category selection** (e.g., Roads, Lighting, Water Supply)

### Supported Categories

- **Roads** – potholes, roadblocks
- **Lighting** – broken or flickering streetlights
- **Water Supply** – leaks, low pressure
- **Cleanliness** – garbage, overflowing bins
- **Public Safety** – open manholes, exposed wiring
- **Obstructions** – fallen trees, debris

and many more... I have added about 20 categories in the database...

### Localized Visibility

- Users only see reports within a **3–5 km radius**
- Visibility based on **GPS or manual location input**
- **No access** to reports outside the user’s neighborhood zone

### Transparency and Tracking

- Each issue has a **detailed page** showing:
  - **Status change logs**
  - **Timestamps** for all updates
- **Reporters receive notifications** when issue status changes

### Map and Filters

- All issues displayed as **pins on an interactive map**
- Filter issues by:
  - **Status**: Reported, In Progress, Resolved
  - **Category**
  - **Distance**: 1 km, 3 km, 5 km

---

## Tech Stack

- **Frontend:** Next.js with ShadCN UI
- **Backend:** Drizzle ORM with PostgreSQL
- **Validation:** Zod
- **Maps Integration:** Google Maps API
- **Containerization:** Docker with Adminer for database inspection
- **Package Management:** PNPM

---
## Getting Started

Follow the steps below to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ayushsingh-ayushsingh/civicTrack.git
cd civicTrack
```

### 2. Install pnpm (if you don't already have)
```bash
npm install -g pnpm
```

### 3. Install Project Dependencies
```bash
pnpm install
```

Copy the example_env.txt file to .env after creating .env file in the root.

### 4. Start PostgreSQL and Adminer with Docker
```bash
docker compose up -d
```

### 5. Start PostgreSQL and Adminer with Docker
```bash
docker compose up -d
```

## Future Enhancements

- Real-time updates via WebSockets
- Role-based dashboards for municipal staff
- Push notifications
- Heatmap visualization of reported issues

---

Crafted with by ♥️ Ayush Singh.
