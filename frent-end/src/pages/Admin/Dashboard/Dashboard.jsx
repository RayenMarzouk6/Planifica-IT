import { Outlet } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 h-full fixed top-0 left-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 ml-[20%]">
        {/* Navbar */}
        <div className="fixed w-[80%] top-0 z-10">
          <NavBar />
        </div>

        {/* Page Content */}
        <div className="pt-[4rem] px-6 h-full overflow-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
