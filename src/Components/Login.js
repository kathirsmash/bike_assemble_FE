import React, { useState } from 'react';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import EmployeeService from './../Services/EmployeeService';
import { showErrorAlert } from './../utils/alert';
import { schema } from './../Validators/LoginSchema';
import { useAuth } from './../Context/AuthContext'; 
import './../Assets/Css/Login.css';

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(credentials, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }
    try {
      const data = await EmployeeService.login(credentials);
      login(data.data);
      showErrorAlert('success', data.message);
      if (data.data.type === 'employee') {
        navigate('/assemble');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    const fieldSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error ? error.details[0].message : null,
    }));
  };

  return (
    <>
      <h3>Login</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
