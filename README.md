# 🚀 CollabBoard – Full Stack Project Management Platform

CollabBoard is a collaborative Kanban-based project management application that enables teams to organize work using boards, lists and tasks, with role-based access control and a scalable full-stack architecture.

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication (access + refresh tokens)
- Forgot / Reset password via email (Mailtrap sandbox)
- Secure HTTP headers using Helmet
- Rate limiting using Arcjet
- Input validation via custom validators and middleware

---

### 👥 Authorization (RBAC)
- Role-based access control with:
  - **Admin**
  - **Member**
  - **Viewer**
- Board creator is automatically assigned **Admin**
- Admins can:
  - Invite users via email
  - Manage roles and remove users
- Middleware-driven authorization enforcement

---

## 🧩 Core Functionality

### 📊 Kanban System
- Create and manage boards, lists and tasks
- Move tasks:
  - Within the same list
  - Across different lists
- Maintain ordering using position-based indexing

---

### 🧾 Task Management
- Assign users to tasks
- Add labels and due dates
- Edit task details via interactive UI

---

### ♻️ Soft Deletion & Restoration (Backend)
- Soft delete for Boards, Lists and Tasks
- Cascading deletion:
  - Deleting a board deletes its lists and tasks (soft)
  - Deleting a list deletes its tasks (soft)
- Full restoration support:
  - Restores entire hierarchy (board → lists → tasks)

---

## 🖥️ Frontend

### ⚛️ Tech & Architecture
- React (functional components)
- Zustand for state management
- Axios for API communication
- Material UI + Tailwind CSS for styling

---

### 🎯 Key Features (Frontend)
- Authentication flows:
  - Signup / Login
  - Forgot Password
  - Reset Password

- Workspace dashboard:
  - Board grid layout
  - Sidebar with user settings

- Board management:
  - Create / update / delete boards
  - Invite users and manage roles

- List management:
  - Create, update and delete lists
  - Dynamic list rendering

- Task management:
  - Create and edit tasks
  - Assign users
  - Manage labels and descriptions

- Interactive UI:
  - Modals for boards, lists and tasks
  - Dropdowns for team and board settings

⚠️ Drag-and-drop task movement and soft deletion UI are currently in progress.

---

## ⚙️ Backend

### 🛠️ Tech & Architecture
- Node.js + Express.js
- MongoDB + Mongoose
- MVC-inspired modular structure

---

### 🧠 Data Models
- **Board**
  - Members with roles `{ userId, role }`
- **List**
  - Belongs to a board
  - Maintains task ordering
- **Task**
  - Belongs to board and list
  - Includes assignees, labels, due dates

All models include timestamps for audit tracking.

---

### 🧩 Backend Features
- RESTful APIs for all entities
- RBAC middleware for access control
- Email integration for:
  - Password reset
  - Board invitations
- Validation middleware for request safety
- Centralized async error handling
- Services layer for clean business logic (e.g., restoration logic)

---

## 🧪 API Testing
- Tested using Postman
- Covers:
  - Authentication flows
  - CRUD operations
  - Task movement
  - Authorization checks

---

## 🚧 Current Status

- Backend features (RBAC, task movement, soft deletion and restoration) are fully implemented and tested via APIs.
- Frontend is functional for core workflows including authentication, board, list and task management.
- Drag-and-drop interactions and soft deletion UI are currently being implemented.

---

## 📈 Future Improvements

- Drag-and-drop UI for task movement
- Soft deletion UI integration
- Notifications system
- In-app invites

## 📸 Screen shots

- Login/signup
<img width="670" height="805" alt="login-signup" src="https://github.com/user-attachments/assets/09fd3576-0711-440e-9a74-9e615255578e" />

- Forgot password
<img width="661" height="664" alt="Forgot-password" src="https://github.com/user-attachments/assets/31a4f15b-7698-43c9-95a6-7402e0c1e5c2" />
