# 🌍 Travel, Hotel, Tour & Vehicle Management System API

A comprehensive, production-grade RESTful API built with **Node.js, Express, TypeScript, Mongoose (MongoDB), Redis, and Zod**. This platform serves as a unified backend for managing hotels, room reservations, tour packages, vehicle rentals, booking schedules, and payment processing with PDF receipt generation.

---

## 🚀 Key Features

* **🔐 Authentication & Authorization:** JWT-based stateless authentication, OAuth 2.0 (Google Login via Passport), session management, and Role-Based Access Control (RBAC) for Admin, Vendor, and Customer.
* **🏨 Hotel & Room Management:** Dynamic listing, filtering, availability checking, and image uploads via Cloudinary.
* **🗺️ Tour Packages & Destinations:** Tour itinerary management, group pricing, and seasonal availability.
* **🚗 Vehicle Rentals:** Booking system for cars/buses with driver assignment and daily rate calculations.
* **📅 Booking Engine:** Unified booking flow supporting multi-resource reservations (Hotel + Tour + Vehicle).
* **💳 Payments & PDF Invoices:** Multi-gateway integration, automated receipt generation using PDFKit, and email dispatch with Nodemailer.
* **⚡ Caching & Performance:** Redis integration for high-performance query caching and fast response times.
* **🛡️ Data Validation & Security:** Strict runtime schema validation via Zod, hashed passwords using BcryptJS, CORS, and cookie parser setup.

---

## 🛠️ Tech Stack

### Core Technologies
* **Language:** TypeScript (`^5.8`)
* **Runtime & Framework:** Node.js, Express.js (`^5.1`)
* **Database & ODM:** MongoDB, Mongoose (`^8.16`)
* **Caching & In-Memory Store:** Redis (`^5.6`)

### Authentication & Utilities
* **Auth:** JSON Web Tokens (`jsonwebtoken`), Passport.js (`passport-google-oauth20`, `passport-local`), BcryptJS
* **Validation:** Zod (`^3.25`)
* **File Uploads:** Multer, Cloudinary, `multer-storage-cloudinary`
* **PDF & Email:** PDFKit, Nodemailer, EJS (HTML Email Templates)
* **HTTP & Statuses:** Axios, `http-status-codes`

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── modules/
│   │   ├── auth/          # Authentication & Passport strategies
│   │   ├── user/          # User management
│   │   ├── hotel/         # Hotels & Room management
│   │   ├── tour/          # Tour packages & Destinations
│   │   ├── vehicle/       # Vehicle inventory & rentals
│   │   ├── booking/       # Booking Engine
│   │   └── payment/       # Payments, Invoices & PDF export
│   ├── middlewares/       # Auth guards, global error handler, validation
│   ├── config/            # Env variables, database, Redis & Cloudinary setup
│   └── builder/          # QueryBuilder utilities (filtering, sorting, pagination)
├── server.ts              # Entry point & DB connection setup
└── app.ts                 # Express app setup & middleware stack

```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed on your system:

* [Node.js](https://nodejs.org/) (v18+ recommended)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
* [Redis](https://redis.io/) (Local server or Cloud instance)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/travel-hotel-tour-management.git](https://github.com/your-username/travel-hotel-tour-management.git)
cd travel-hotel-tour-management

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://127.0.0.1:27017/travel-management
REDIS_URL=redis://127.0.0.1:6379

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OAuth & Mail
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password

```

### 4. Run the Development Server

```bash
npm run dev

```

The server will boot up with hot-reloading at `http://localhost:5000`.

---

## 📜 Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| **`npm run dev`** | `ts-node-dev ...` | Starts development server with live reload |
| **`npm run build`** | `tsc` | Compiles TypeScript into JavaScript (`/dist`) |
| **`npm run start`** | `node ./dist/server.js` | Runs compiled production build |
| **`npm run lint`** | `npx eslint ./src` | Lints source code for style & syntax errors |

---

## 📄 License

This project is licensed under the [ISC License](https://www.google.com/search?q=LICENSE).

```

```