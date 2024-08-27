import React from 'react';
import { GoogleLogout } from 'react-google-login';


const AdminView = ({ user, onLogout, setView }) => {
  const handleGenerateReport = () => {
    const programName = prompt('يرجى إدخال اسم البرنامج');
    if (programName === 'attendanceLog') {
      setView(programName)
    }else{
      alert('incorrect report name')
    }
  };

  const handleManagePrograms = () => {
    // Implement the logic to manage programs
  };

  const handleViewUsers = () => {
    // Implement the logic to view user data
  };

  return (
    <div className="container">
      <h1>واجهة المشرف</h1>
      <div className="space-y-4">
        <button onClick={handleGenerateReport} className="bg-primary">إنشاء تقرير</button>
        <button onClick={handleManagePrograms} className="bg-secondary">إدارة البرامج</button>
        <button onClick={handleViewUsers} className="bg-tertiary">عرض بيانات المستخدمين</button>
      </div>
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="تسجيل الخروج"
        onLogoutSuccess={onLogout}
      />
    </div>
  );
};

export default AdminView;
