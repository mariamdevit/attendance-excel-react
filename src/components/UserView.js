import React, { useState } from 'react';

const UserView = ({ user, onLogout }) => {



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
     
    </div>
  );
};

export default UserView;
