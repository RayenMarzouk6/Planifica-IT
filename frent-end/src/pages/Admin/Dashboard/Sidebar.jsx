import { Link, useLocation } from "react-router-dom"; // Ensure the correct import here!
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import DevicesIcon from '@mui/icons-material/Devices';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WindowIcon from '@mui/icons-material/Window';

const Links = [
  { text: "Dashboard", icon: <WindowIcon />, path: "/admin" },
  { text: "Manage Clients", icon: <AccountBoxIcon />, path: "/admin/client" },
  { text: "Manage Employees", icon: <HomeRepairServiceIcon />, path: "/admin/employe" },
  { text: "Manage Projects", icon: <DevicesIcon />, path: "/admin/project" },
  { text: "Manage Tasks", icon: <AssignmentIcon />, path: "/admin/task" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside style={{ backgroundColor: '#4C585B', color: 'white' }} className="text-white h-full p-4">
      <div className="mb-8 flex items-center">
        <img src="Auth/logo-green.png" className="w-20" alt="Logo" />
        <h1 className="font-bold text-3xl">Planifica-IT</h1>
      </div>
      <nav className="flex items-center justify-center">
        <ul className="space-y-4 w-full">
          {Links.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.path} // Add a unique key for each list item
                style={{
                  backgroundColor: isActive ? "#7E99A3" : null, // Conditional background color
                }}
                className="p-4 w-full rounded-md transition-colors duration-200"
              >
                <Link to={item.path} className="hover:text-blue-300 block flex items-center gap-2">
                  {item.icon} {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;