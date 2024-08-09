import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Hardcoded admin credentials
        const adminUsername = 'admin';
        const adminPassword = 'admin';

        // Check if entered credentials match the hardcoded credentials
        if (username === adminUsername && password === adminPassword) {
            // Store admin status in localStorage to keep the user logged in
            localStorage.setItem('isAdmin', 'true');
            // Navigate to the admin dashboard
            navigate('/admin');
        } else {
            // Display an error message if credentials are incorrect
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" className="btn-login">Login</button>
            </form>
        </div>
    );
};

export default Login;
