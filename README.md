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
[Travel App_details.pdf](https://github.com/user-attachments/files/18573146/Travel.App_details.pdf)


## Setup and Installation

### Prerequisites
Ensure the following are installed on your system:
- Node.js (v14+)
- MongoDB (local or cloud)
- Git

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/planifica-it.git
   cd planifica-it
   ```
