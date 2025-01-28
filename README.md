# PLANIFICA IT

**PLANIFICA IT** is a task and project management platform designed to streamline collaboration, enhance productivity, and ensure organized workflows for teams and individuals. With an intuitive interface, robust features, and seamless user experience, PLANIFICA IT empowers users to efficiently plan, assign, and track their tasks.
![output-onlinepngtools (2)](https://github.com/user-attachments/assets/b7a23bfe-e445-40ea-a5da-74ccd762eeac)

## Key Features

### User Authentication
- Secure login and signup using JWT tokens.
- Role-based access control for enhanced security.

### Task Management
- Create, assign, and manage tasks for users.
- Mark tasks as completed or pending.
- Filter and view tasks by status (completed, pending, or deleted).

### Project Overview
- Associate tasks with specific projects for better organization.
- Track project progress with aggregated task data.

### Custom Task Status
- "Delete" tasks visually without removing them from the database, stored in `localStorage` for persistence.

### Dashboard Statistics Report
- Generate detailed statistical reports on task completion rates, user productivity, and project progress.

### Project Detail Report
- Export a comprehensive report of project details, including task breakdowns, assigned users, and progress metrics.

### Responsive UI
- Fully responsive design for desktop, tablet, and mobile devices.

## Technologies Used

### Frontend
- **React.js**: For building a dynamic and interactive user interface.
- **Material-UI (MUI)**: For modern and responsive design components.
- **Axios**: For seamless HTTP requests.

### Backend
- **Node.js with Express.js**: For building RESTful APIs.
- **MongoDB**: As the primary database for managing tasks and user data.
- **JWT Authentication**: For secure user authentication and authorization.

### Additional Libraries
- **jwt-decode**: For decoding and extracting user information from tokens.
- **chart.js**: For generating visually appealing and interactive dashboard statistics.

## Usage

### **Login or Register**
- Sign up for an account or log in with existing credentials.

### **Manage Tasks**
- Create tasks, assign them to users, and monitor their status.
- Mark tasks as completed or pending with a simple checkbox toggle.

### **Generate Reports**
- Navigate to the Dashboard for statistical insights.
- View project details and export reports as PDFs.
  *Exemple Reports :*
[Statistic_Dashboard.pdf](https://github.com/user-attachments/files/18573144/Statistic_Dashboard.pdf)
🚀
[Travel App_details.pdf](https://github.com/user-attachments/files/18573146/Travel.App_details.pdf)

## Screenshots
### Login & SignUp Page
![Capture d'écran 2025-01-28 131144](https://github.com/user-attachments/assets/4d5d431c-1d8d-47db-a3cf-0013989288fe)
![Capture d'écran 2025-01-28 131200](https://github.com/user-attachments/assets/4ea9925e-cb7e-4d9d-8feb-2a67636e8671)

### Home Page
![Capture d'écran 2025-01-28 120437](https://github.com/user-attachments/assets/cfcd6413-80de-455e-82e0-ffca5fd68dc6)
![Capture d'écran 2025-01-28 120412](https://github.com/user-attachments/assets/0ffa2a0b-b659-4889-9f7c-d5f36f1acef7)

### User Dasboard
![Capture d'écran 2025-01-28 120846](https://github.com/user-attachments/assets/f5111b67-2573-4cd0-bbd6-7200670f1053)
![Capture d'écran 2025-01-28 120937](https://github.com/user-attachments/assets/ce1f1bb8-fe1f-4acd-9434-a31badf42d83)
![Capture d'écran 2025-01-28 122331](https://github.com/user-attachments/assets/31340950-4bbf-4ce0-926e-d6250440d79d)
![Capture d'écran 2025-01-28 122350](https://github.com/user-attachments/assets/e13a35b8-bb7d-42d9-965b-8ca0c362f844)

### Admin Dasboard
![Capture d'écran 2025-01-28 123815](https://github.com/user-attachments/assets/96bcc85b-8316-47b2-91ad-2272cb223263)
![Capture d'écran 2025-01-28 121704](https://github.com/user-attachments/assets/431fea2f-448b-4ee3-adf0-be99cb21e0f6)
![Capture d'écran 2025-01-28 121715](https://github.com/user-attachments/assets/d469d3ad-3140-4917-863b-db2dd2ce105a)
![Capture d'écran 2025-01-28 121832](https://github.com/user-attachments/assets/0ea89546-ea72-4afe-8ee3-1d57048c51b2)
![Capture d'écran 2025-01-28 121941](https://github.com/user-attachments/assets/7ac2cc1c-9a1f-4848-be41-bb67ae7ca748)
![Capture d'écran 2025-01-28 122127](https://github.com/user-attachments/assets/3c7e5dfb-9563-432e-b82f-5a27a6189f3d)



## Setup and Installation

### Prerequisites
Ensure the following are installed on your system:
- Node.js (v14+)
- MongoDB (local or cloud)
- Git

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/RayenMarzouk6/planifica-it.git
   cd planifica-it
   ```
