import React, { useState, useEffect, useRef } from 'react';
import { gapi } from 'gapi-script';
import AdminView from './components/AdminView';
import UserView from './components/UserView';
import LoginView from './components/LoginView';
import AttendanceView from './components/AttendanceView'
import AttendanceLog from './components/AttendanceLog'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;

function App() {

  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login', 'admin', 'user', 'attendanceView'
  
  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [
          'https://sheets.googleapis.com/$discovery/rest?version=v4',
          'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
          'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
        ],
        scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/gmail.readonly',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleLoginSuccess = (response) => {
    setUser(response.profileObj);
    setView(response.profileObj.email.endsWith('@admin.com') ? 'admin' : 'user');
  };

  const handleLoginFailure = (response) => {
    console.log('Login failed', response);
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  return (
    <div className="App">
      {view === 'login' && (
        <LoginView
        setView={setView}
        />
      )}
      {view === 'adminView' && <AdminView setView={setView} user={user} onLogout={handleLogout} />}
      {view === 'userView' && <UserView setView={setView} user={user} onLogout={handleLogout} />}
      {view === 'attendanceView' && <AttendanceView setView={setView} />}
      {view === 'attendanceLog' && <AttendanceLog setView={setView} />}
    </div>
  );
}

export default App;
