import React, { useState } from 'react';
import {config} from './../googleApi'
import {
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';

const LoginView = ({setView}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      Username: username,
      Password: password,
      SheetId: 'users',
      Action: 'login'

    }).toString();

    fetch(
      `${config.url}?${params}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage(`Login successful! Welcome ${data.type}`);
          setUserType(data.type);
          if(data.type === 'Admin'){
            setView('adminView')
          }else if(data.type === 'User'){
            setView('attendanceView')
          }
          // You can handle further logic here, like redirecting based on user type
        } else {
          setMessage('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('An error occurred during login');
      });
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button variant="contained" type="submit">Login</Button>
      <Typography variant="body2" color="textSecondary">{message}</Typography>
    </Box>
  );
};

export default LoginView;
