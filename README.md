# 📋 Task Manager

A premium, interactive, and responsive Task Management web application built with **React**, **Vite**, **Firebase Authentication**, and a local mock database powered by **JSON Server**. 

The application features a modern, fluid Kanban-style board using `@hello-pangea/dnd` for seamless drag-and-drop task organization, comprehensive search/filter tools, real-time status statistics, and a fully custom dark-and-light theme system.

---

## ✨ Features

- **🔐 Firebase Authentication**: Secure user registration, login, and sign-out. User sessions are persisted, and each user only sees their own tasks.
- **🎛️ Kanban Board (Drag & Drop)**: Organized into dynamic columns (**Todo**, **In Progress**, and **Done**) with smooth transitions and persistent column updates.
- **📝 Complete CRUD Operations**:
  - **Create**: Add new tasks with title, description, priority level, and an optional due date.
  - **Read**: Fetch and display tasks in real-time.
  - **Update**: Edit details of existing tasks or drag them to change their current status.
  - **Delete**: Remove tasks permanently with instant UI updates.
- **🔍 Advanced Controls**:
  - **Search**: Fast, real-time search across titles and descriptions.
  - **Filter**: Narrow down tasks by priority (**All**, **High**, **Medium**, **Low**).
  - **Sort**: Order tasks dynamically by **Newest**, **Oldest**, or **Due Date**.
- **📊 Real-time Statistics Dashboard**: Visualized breakdown of task statuses (Total, Pending/Todo, In Progress, and Completed).
- **🌓 Adaptive Theme System**: Instant toggle between high-contrast dark and light modes with custom fluid transitions.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19, Vite (for blazing fast build/HMR)
- **State Management**: React Context API (`AuthContext`, `TaskContext`, `ThemeContext`)
- **Drag and Drop**: `@hello-pangea/dnd` (successor to `react-beautiful-dnd`)
- **HTTP Client**: Axios (configured with base URL and timeout)
- **Authentication**: Firebase Client SDK (Auth Module)
- **Mock Database**: JSON Server (acts as local REST API backend)
- **UI Icons**: React Icons (`react-icons`)
- **Notifications**: React Toastify (`react-toastify`)

---

## 📂 Project Structure

```text
task-manager/
├── public/                 # Static assets (Favicons, SVG graphics)
├── src/
│   ├── assets/             # Images, global style files
│   ├── components/         # Reusable UI components
│   │   ├── AuthPage.jsx       # Login and Registration interface
│   │   ├── TaskStats.jsx      # Dashboard statistics
│   │   ├── TaskForm.jsx       # Create task form
│   │   ├── EditTaskForm.jsx   # Modal form to edit task details
│   │   ├── TaskList.jsx       # Board controller for drag-and-drop columns
│   │   ├── TaskColumn.jsx     # Individual status column
│   │   ├── TaskCard.jsx       # Individual task item card
│   │   ├── SearchBar.jsx      # Task search input
│   │   ├── PriorityFilter.jsx # Priority dropdown selector
│   │   ├── SortTasks.jsx      # Sort dropdown selector
│   │   └── ThemeToggle.jsx    # Dark/Light mode switch button
│   ├── config/
│   │   └── firebase.js     # Firebase SDK initialization
│   ├── context/
│   │   ├── AuthContext.jsx # Manages sign-up, login, logout, and state
│   │   ├── TaskContext.jsx # Handles CRUD operations, filtering, and sorting
│   │   └── ThemeContext.jsx# Handles application theme configuration
│   ├── services/
│   │   └── taskApi.js      # Axios instance and API calls
│   ├── App.jsx             # Main layout routing and shell
│   ├── main.jsx            # Application bootstrap with context providers
│   ├── index.css           # Global typography and design system variables
│   └── App.css             # Layout styling and UI animations
├── .env                    # Environment variables (Firebase keys)
├── db.json                 # Mock database file
├── package.json            # Scripts & project dependencies
└── vite.config.js          # Vite build configurations
```

---

## 🚀 Getting Started

To run this application locally, you will need to start both the **Mock Database Server** (JSON Server) and the **Frontend Dev Server** (Vite).

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 2. Installation

Clone this repository and navigate to the project directory:

```bash
cd task-manager
npm install
```

### 3. Environment Variables Configuration

Create a `.env` file in the root directory (or update the existing one) with your Firebase credentials. Example configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### 4. Running the Local Database (Backend)

Start the JSON Server to host the mock REST API (`http://localhost:3000`):

```bash
npm run server
```

This command runs `json-server db.json` which initializes the `db.json` database schema.

### 5. Running the Application (Frontend)

In a separate terminal window/tab, start the Vite development server:

```bash
npm run dev
```

Once running, open your browser and navigate to `http://localhost:5173`.

---

## 🔌 API Endpoints

Axios client calls the local backend JSON Server. Here are the endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | Retrieves all tasks. Code filters these by the authenticated user's ID. |
| `POST` | `/tasks` | Appends a new task object to the database. |
| `PATCH` | `/tasks/:id` | Modifies an existing task's attributes (e.g. description or status). |
| `DELETE` | `/tasks/:id` | Deletes a task from the database. |

### Task Schema Sample

```json
{
  "id": "vTF6AZb-5gY",
  "title": "Develop Landing Page",
  "description": "Design and build a responsive home page layout.",
  "priority": "High",
  "status": "In Progress",
  "dueDate": "2026-07-20",
  "createdAt": "2026-07-05T07:25:01.030Z",
  "userId": "W42uZBOpZjTi2N7Iy7hzKRJdJvO2"
}
```

---

## 🎨 Theme Customization

The application uses global CSS variables for typography and colors, defined in `src/index.css`. Standard colors and layout parameters adjust smoothly depending on the `.dark` class toggled on the `body` tag:

- **Light Mode Background**: `#f8fafc` (slate-50)
- **Dark Mode Background**: `#0f172a` (slate-900)
- **Primary Accent**: `#4f46e5` (indigo-600)
- **Text Color Transition**: `transition: background-color 0.3s ease, color 0.3s ease`
