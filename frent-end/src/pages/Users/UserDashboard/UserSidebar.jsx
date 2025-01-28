import { Link, useLocation } from "react-router-dom";
import AssignmentIcon from '@mui/icons-material/Assignment';
import WindowIcon from '@mui/icons-material/Window';
import DvrIcon from '@mui/icons-material/Dvr';


const Links = [
  { text: "Dashboard", icon: <WindowIcon />, path: "/user-dashboard" },
  { text: "My Proejcts", icon: <DvrIcon/>, path: "/user-dashboard/assigned-projects" },
  { text: "My Tasks", icon: <AssignmentIcon />, path: "/user-dashboard/user-tasks" },
];

const UserSidebar = () => {
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
                key={item.path}
                style={{
                  backgroundColor: isActive ? "#7E99A3" : null,
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

export default UserSidebar;