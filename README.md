🏥 Healthcare Service Frontend
=============================

This repository contains the frontend application for the **Smart Healthcare Appointment & Records System**. It is a modern, responsive, and user-friendly web interface built with **React**, providing a seamless user experience for patients, doctors, and administrators to interact with the backend services.

## ✨ Features

This application provides a dedicated, role-based interface for each user, leveraging the backend API endpoints.

### Patient Portal

- **Dashboard:** View personal information and upcoming appointments.
- **Find Doctors:** Browse and search for doctors by specialty or name.
- **Book Appointments:** Select a doctor and schedule an appointment from available slots.
- **Appointment History:** Review past appointments and view associated prescriptions.

### Doctor Portal

- **Dashboard:** See a schedule of upcoming appointments for the day.
- **Patient Records:** Access the history of patients with completed appointments.
- **Create Prescriptions:** Write and issue new prescriptions for patients after a consultation.

### Admin Portal

- **Doctor Management:** View a list of all doctors, including those with pending registration.
- **Approve Doctors:** Review and approve new doctor registrations to grant them system access.
- **Patient Management:** View and manage a list of all registered patients in the system.

## 🏛️ Architecture Overview

This frontend follows a modern component-based architecture using React to create a modular and maintainable user interface.

- **Components Layer:** The UI is built from small, reusable components (e.g., Button, AppointmentCard, DoctorProfile). These are organized into larger "View" components that represent full pages.
- **Routing Layer:** React Router is used to handle client-side navigation, directing users to the correct views based on the URL and protecting routes based on user roles (e.g., a patient cannot access the admin dashboard).
- **State Management Layer:** A centralized store (like Redux Toolkit) will manage the application's state, such as user authentication status, lists of doctors, and appointment data. This ensures data is consistent across the application.
- **API Service Layer:** Axios is used to create a dedicated layer for communicating with the backend REST API. It handles sending authenticated requests, fetching data, and processing responses, with interceptors for centralized token management.

## 💻 Technology Stack

| Component | Technology / Library | Purpose |
|-----------|---------------------|---------|
| UI Library | React 18.x | Core library for building the user interface with components. |
| Build Tool | Vite | Modern, fast frontend build tool for development and production. |
| Routing | React Router DOM | For client-side routing and navigation between pages. |
| HTTP Client | Axios | Making promise-based HTTP requests to the backend API. |
| State Management | Redux Toolkit & React Redux | Centralized and predictable state management for the entire application. |
| Styling | Material-UI / Tailwind CSS | Component library and/or utility-first CSS for a clean, modern design. |
| API Documentation | Swagger UI | Viewing and interacting with the backend API documentation. |
| Package Manager | npm / Yarn | Managing project dependencies. |
| Linting | ESLint / Prettier | Maintaining code quality and consistent formatting. |
| Utilities | Lombok (for backend) | Reducing boilerplate code in the Java backend. |

## 🔑 Client-Side Security

Security on the frontend is focused on managing authentication tokens and controlling user access to different parts of the application.

- **Authentication:** Users log in via a dedicated login form, which sends credentials to the backend's `/auth/login` endpoint.
- **Token Storage:** Upon successful login, the received JWT is stored securely in the browser's localStorage or sessionStorage.
- **Authenticated Requests:** For all subsequent API calls to protected endpoints, an Axios interceptor automatically attaches the JWT to the `Authorization: Bearer <token>` header.
- **Protected Routes:** Application routes are wrapped in a special component that checks for a valid JWT. If the user is not authenticated, they are redirected to the login page. The user's role (decoded from the token) is used to grant access to role-specific pages (e.g., Patient, Doctor, Admin).

## 📖 API Documentation

The backend service provides comprehensive and interactive API documentation using SpringDoc OpenAPI. This is essential for frontend development. The Swagger UI can be accessed once the backend server is running:
```http://localhost:8080/swagger-ui/index.html#/```

This UI allows you to see all available endpoints, their required request bodies, and expected response models.

🗄️ Database Schema
-------------------

The database schema is designed to be normalized and efficient, capturing the essential relationships within the healthcare system.

 ![Database ER Diagram](https://raw.githubusercontent.com/ankitdoi-coder/HealthCare-Backend/main/Requirements%20&%20Architecture/04_ERD_DB.jpg)

## 🚀 Getting Started

Follow these instructions to get a local instance of the application up and running for development.

### Prerequisites

- **Node.js**: v18.x or later
- **npm** or **Yarn**: Package manager
- **Java**: JDK 17 or later
- **Maven**: For building the backend
- **MySQL**: Database for the backend

### 1. Backend Setup

First, ensure the backend server is running.

1.  **Clone the backend repository:**
    ```bash
    git clone https://github.com/ankitdoi-coder/HealthCare-Backend.git
    cd HealthCare-Backend
    ```

2.  **Configure the database:**
    - Create a new database in MySQL (e.g., `healthcaredb`).
    - Update `src/main/resources/application.properties` with your database URL, username, and password.

3.  **Run the backend server:**
    ```bash
    mvn spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

### 2. Frontend Setup

1.  **Clone this frontend repository:**
    ```bash
    git clone https://github.com/your-username/healthcare-frontend.git
    cd healthcare-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173`.

### ⚙️ Environment Variables

The frontend application expects the backend API to be running at `http://localhost:8080`. If your backend is on a different URL, create a `.env.local` file in the root of the frontend project and add the following variable:

```
VITE_API_BASE_URL=http://your-backend-api-url
```
