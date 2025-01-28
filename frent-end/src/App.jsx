import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import HomeDashboard from './pages/Admin/Dashboard/HomeDasboard/HomeDashboard';
import Client from './pages/Admin/Clients/Client';
import UpdateClient from './pages/Admin/Clients/UpdateClient';
import Employe from './pages/Admin/Employees/Employe';
import Project from './pages/Admin/Projects/Project';
import NotFound from './pages/Not/NotFound';
import NotAccess from './pages/Not/NotAccess';
import PrivateRouter from './components/Security/PrivateRouter';
// import Profile from './pages/Profile/Profile';
import AdminRouter from './components/Security/AdminRouter';
import ForceRedirect from './components/Security/ForceRedirect';
import store from './redux/store';
import { setUser } from './redux/actions/authActions';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import UserDashboard from './pages/Users/UserDashboard/UserDashboard';
import AddClient from './pages/Admin/Clients/AddClient';
import AddEmployee from './pages/Admin/Employees/AddEmployee';
import UpdateEmplyee from './pages/Admin/Employees/UpdateEmplyee';
import ProjectDetails from './pages/Admin/Projects/ProjectDetails';
import AddProject from './pages/Admin/Projects/AddProject';
import UpdateProject from './pages/Admin/Projects/UpdateProject';
import HomePage from './pages/Home/HomePage';
import TaskBoard from './pages/Admin/Tasks/TaskBoard';
import ProfileAllUser from './pages/Husky/ProfileAllUser';
import UserHomeDashboard from './pages/Users/UserDashboard/UserHomeDashboard';
import UserTasks from './pages/Users/UserDashboard/UserTasks';
import UserAssignedProject from './pages/Users/UserDashboard/UserAssignedProject';

if (localStorage.jwt) {
  const decode = jwtDecode(localStorage.jwt);
  store.dispatch(setUser(decode));
}

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // Initialize user state from localStorage on page refresh
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decode = jwtDecode(token);
      dispatch(setUser(decode));
    }
  }, [dispatch]);

  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
  };

  console.log('Auth:', auth); // Debug: Log the auth state

  return (
<BrowserRouter>
  <Routes>
    {/* Public Routes */}
    <Route
      path="/login"
      element={
        <ForceRedirect user={user}>
          <Login />
        </ForceRedirect>
      }
    />
    <Route
      path="/register"
      element={
        <ForceRedirect user={user}>
          <Register />
        </ForceRedirect>
      }
    />
    <Route path="*" element={<NotFound />} />
    <Route path="/notaccess" element={<NotAccess />} />
    <Route path="/" element={<HomePage />} />

    {/* Profile Route with Role-Based Access */}
    {/* <Route
          path="/profile"
          element={
            <PrivateRouter user={user}>
              {user.role === 'ADMIN' || user.role === 'EMPLOYEE' ? (
                <ProfileAllUser />
              ) : (
                <Navigate to="/notaccess" />
              )}
            </PrivateRouter>
          }
        /> */}

    {/* Admin Routes */}
    <Route
      path="/admin"
      element={
        <AdminRouter user={user}>
          <Dashboard />
        </AdminRouter>
      }
    >
      <Route index element={<HomeDashboard />} />
      <Route path="client" element={<Client />} />
      <Route path="addClient" element={<AddClient />} />
      <Route path="updateClient/:clientId" element={<UpdateClient />} />

      <Route path="profile" element={<ProfileAllUser />} />

      <Route path="employe" element={<Employe />} />
      <Route path="addEmployee" element={<AddEmployee />} />
      <Route path="updateEmplyee/:employeId" element={<UpdateEmplyee />} />

      <Route path="project" element={<Project />} />
      <Route path="projectDetails" element={<ProjectDetails />} />
      <Route path="addproject" element={<AddProject />} />
      <Route path="updateproject/:projectId" element={<UpdateProject />} />

      <Route path="task" element={<TaskBoard />} />

      {/* <Route path="adminProfile" element={<AdminProfile />} /> */}
    </Route>

    {/* User Routes */}
    <Route
      path="/user-dashboard"
      element={
        <PrivateRouter user={user}>
          <UserDashboard />
        </PrivateRouter>
      }
    >
      <Route index element={<UserHomeDashboard />} />
      <Route path="user-tasks" element={<UserTasks />} />
      <Route path="assigned-projects" element={<UserAssignedProject />} />

      <Route path="profile" element={<ProfileAllUser />} />
      
    </Route>
  </Routes>
</BrowserRouter>


  );
}

export default App;