import { Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Correct import for Link
import { Registration } from '../../redux/actions/authActions';

const Register = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(Registration(form, navigate));
  };

  return (
    <div className="grid grid-cols-2 min-h-screen">
      {/* Left Section */}
      <div className="bg-blue-200 flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">
          Join Planifica<span className="text-blue-600">-IT</span> Today!
        </h1>
        <Typography variant="body1" color="textSecondary">
          Create your account to start managing IT projects like a pro.
        </Typography>
        <img src="Auth/signup.png" alt="register" />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center">
        <img src="Auth/logo.png" alt="logo" className="w-40" />
        <Stack className="w-96">
          <h6 className="text-2xl font-bold mb-4">Sign Up 🧑🏼‍💼</h6>

          {/* Form Section */}
          <form
            onSubmit={onSubmitHandler}
            className="w-full flex flex-col gap-4" // Ensure consistent width and spacing
          >
            <TextField
              error={!!errors?.name}
              type="text"
              name="name"
              label="User Name"
              variant="outlined"
              onChange={onChangeHandler}
              helperText={errors?.name || ''}
              fullWidth
            />

            <TextField
              error={!!errors?.email}
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              onChange={onChangeHandler}
              helperText={errors?.email || ''}
              fullWidth
            />

            <TextField
              error={!!errors?.password}
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              onChange={onChangeHandler}
              helperText={errors?.password || ''}
              fullWidth
            />

            <TextField
              error={!!errors?.confirm}
              type="password"
              name="confirm"
              label="Confirm Password"
              variant="outlined"
              onChange={onChangeHandler}
              helperText={errors?.confirm || ''}
              fullWidth
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>

          <Typography variant="body1" className="text-right py-5">
            <Link to="/login">I have an account</Link>
          </Typography>
        </Stack>
      </div>
    </div>
  );
};

export default Register;
