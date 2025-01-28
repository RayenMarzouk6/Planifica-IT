import { Link } from "react-router"

const NavBarHome = () => {
  return (
    <nav className="flex border-b-2 justify-between fixed w-full px-14 py-1">
        <div className="flex items-center">
          <img src="./Auth/logo.png" alt="logo" className="max-w-24" />
          <p className="text-2xl font-bold text-gray-800">Planifica IT</p>
        </div>

        <div className="flex items-center gap-5">
          <p>about</p>
          <p>about</p>
          <button className='bg-slate-950 px-5 py-3 text-white rounded-lg'>
            <Link to="/login">Login</Link>
          </button>

          <button className='border-2 border-solid border-slate-950 px-3 py-3 rounded-lg' >
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
    </nav>
  )
}

export default NavBarHome