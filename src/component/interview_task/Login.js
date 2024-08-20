import React, { useState } from 'react';
import './login.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [UserName, setUserName] = useState('');
  const [loginusername, setloginusername] = useState('');
  const [loginpass, setloginpass] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const togglePanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  const validatePassword = (password) => {
    const errors = [];
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[@$!%*?&#]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    if (password.length < 7) {
      errors.push("Password must be at least 7 characters long.");
    }
    return errors;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const errors = validatePassword(newPassword);
    setValidationErrors(errors);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validationErrors.length === 0) {
      const res = await axios.post('http://localhost:5000/api/signup',{
        name: Name,
        username: UserName,
        password: password
      });
      console.log(res.data);
      setIsRightPanelActive(!isRightPanelActive);
    } else {
      alert("Please fix the validation error.");
    }
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/signin',{
      username: loginusername,
      password: loginpass
    });

    
    if(res.status === 200) {
      navigate('/home');
    }else{
      alert('Invalid credentials');
    }
    
    
  }

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form className='loginform' onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
          <input type="text" placeholder="Username" onChange={(e)=>setUserName(e.target.value)}  />
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Password" 
          />
          {validationErrors.length > 0 && (
            <p style={{ color: 'red' }}>
              {validationErrors[0]}
            </p>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#" className='loginform' onSubmit={handleLogin}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input type="text" placeholder="User Name" onChange={(e)=>setloginusername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e)=>setloginpass(e.target.value)} />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={togglePanel}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" id="signUp" onClick={togglePanel}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
