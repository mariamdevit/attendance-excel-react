import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const UserView = ({ user, onLogout }) => {
  const [attendanceData, setAttendanceData] = useState({
    name: '',
    phone: '',
    email: '',
    degree: '',
    program: '',
  });

  const handleChange = (e) => {
    setAttendanceData({ ...attendanceData, [e.target.id]: e.target.value });
  };

  const handleAttendanceSubmit = () => {
    // Submit the attendance data to Google Sheets
  };

  const handleDepartureSubmit = () => {
    // Submit the departure data to Google Sheets
  };

  return (
    <div className="container">
      <h1>واجهة الباحث</h1>
      <div className="space-y-4">
        <button onClick={handleAttendanceSubmit} className="bg-primary">تسجيل الحضور</button>
        <button onClick={handleDepartureSubmit} className="bg-secondary">تسجيل الانصراف</button>
      </div>
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="تسجيل الخروج"
        onLogoutSuccess={onLogout}
      />
    </div>
  );
};

export default UserView;
