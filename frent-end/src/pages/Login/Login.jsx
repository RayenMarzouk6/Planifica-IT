import { Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Correct import for Link
import { LoginAction } from "../../redux/actions/authActions";



const Login = () => {
  const [form, setForm] = useState({});
  
  const dispatch = useDispatch()
  const errors = useSelector(state=>state.errors)
  const navigate = useNavigate()


  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      LoginAction(form , navigate)
    )
  };

  return (
    <div className="grid grid-cols-2 min-h-screen">
      {/* Left Section */}
      <div className="flex justify-center items-center min-h-screen">
        <Stack className="max-w-96">
        <Link to="/">
          <img
            src="Auth/logo.png"
            alt="logo"
            className="absolute top-0 left-0 w-28 m-5"
          />
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            👋🏼 To Planifica<span className="text-blue-600"> IT</span>!
          </h1>
          <Typography variant="body1" color="textSecondary" className="pb-12">
            Log in to manage your IT projects, tasks, and clients efficiently.
          </Typography>

          {/* Form Section */}
          <form
            onSubmit={onSubmitHandler}
            className="w-full flex flex-col gap-4" // Maintain consistent spacing and layout
          >
            <TextField
              error={!!errors?.email}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md p-2"
              onChange={onChangeHandler}
              helperText={errors?.email || ''}
            />

            <TextField
              error={!!errors?.password}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-md p-2"
              onChange={onChangeHandler}
              helperText={errors?.password || ''}
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>

          <Typography variant="p" color="initial" className="text-right py-5">
            <Link to="/register">I don't have account</Link>
          </Typography>
        </Stack>
      </div>

      {/* Right Section */}
      <div className="bg-blue-400 flex justify-center items-center">
        <img
          src="Auth/login.png"
          alt="Login illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Login;
